import { Response } from "express";
import { QueryTypes } from "sequelize";
import { AuthRequest } from "../middlewares/authMiddleware";
import { sequelize } from "../config/db.postgres";

/**
 * Generic database administration controller.
 *
 * Exposes a small CRUD surface over every base table in the `public` schema so
 * the admin panel can browse/add/edit/delete raw rows. Because table and column
 * names cannot be passed as bound parameters, every identifier is validated
 * against the live schema (information_schema / pg_catalog) before being
 * interpolated, and all *values* go through bound `replacements`. This keeps the
 * endpoint safe from SQL injection on both identifiers and values.
 */

const quoteIdent = (ident: string): string => `"${ident.replace(/"/g, '""')}"`;

const listTableNames = async (): Promise<string[]> => {
  // NOTE: a single-column SELECT of an information_schema `sql_identifier`
  // column comes back as a positional array via node-postgres. Aliasing the
  // column (so it's a plain text result) forces the normal keyed-object shape.
  const rows = await sequelize.query<{ name: string }>(
    `SELECT table_name AS name FROM information_schema.tables
       WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
       ORDER BY table_name`,
    { type: QueryTypes.SELECT },
  );
  return rows.map((r) => r.name);
};

interface ColumnMeta {
  name: string;
  dataType: string;
  isNullable: boolean;
  defaultValue: string | null;
  isPrimaryKey: boolean;
  isGenerated: boolean;
}

const getColumnMeta = async (table: string): Promise<ColumnMeta[]> => {
  const cols = await sequelize.query<{
    column_name: string;
    data_type: string;
    is_nullable: string;
    column_default: string | null;
    is_identity: string;
    is_generated: string;
  }>(
    `SELECT column_name, data_type, is_nullable, column_default, is_identity, is_generated
       FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = :table
       ORDER BY ordinal_position`,
    { type: QueryTypes.SELECT, replacements: { table } },
  );

  const pkRows = await sequelize.query<{ attname: string }>(
    `SELECT a.attname
       FROM pg_index i
       JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
       WHERE i.indrelid = (quote_ident(:table))::regclass AND i.indisprimary`,
    { type: QueryTypes.SELECT, replacements: { table } },
  );
  const pkSet = new Set(pkRows.map((r) => r.attname));

  return cols.map((c) => ({
    name: c.column_name,
    dataType: c.data_type,
    isNullable: c.is_nullable === "YES",
    defaultValue: c.column_default,
    isPrimaryKey: pkSet.has(c.column_name),
    isGenerated: c.is_identity === "YES" || c.is_generated === "ALWAYS",
  }));
};

/** Resolve a validated table name from the request, or null if invalid. */
const resolveTable = async (raw: unknown): Promise<string | null> => {
  if (typeof raw !== "string") return null;
  const tables = await listTableNames();
  return tables.includes(raw) ? raw : null;
};

/** Normalise an incoming value for a given column type. */
const coerceValue = (value: unknown, col: ColumnMeta): unknown => {
  if (value === "" || value === undefined) {
    return col.isNullable ? null : "";
  }
  if (value === null) return null;
  // Objects/arrays headed for json(b) columns must be stringified.
  if (
    typeof value === "object" &&
    (col.dataType === "json" || col.dataType === "jsonb")
  ) {
    return JSON.stringify(value);
  }
  return value;
};

// GET /api/admin/db/tables
export const listTables = async (
  _req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const tables = await listTableNames();
    // Include an approximate row count per table for a richer overview.
    const counts = await sequelize.query<{
      relname: string;
      n: string;
    }>(
      `SELECT c.relname, c.reltuples::bigint AS n
         FROM pg_class c
         JOIN pg_namespace ns ON ns.oid = c.relnamespace
         WHERE ns.nspname = 'public' AND c.relkind = 'r'`,
      { type: QueryTypes.SELECT },
    );
    const countMap = new Map(counts.map((c) => [c.relname, Number(c.n)]));
    res.status(200).json({
      tables: tables.map((name) => ({
        name,
        approxRows: Math.max(0, countMap.get(name) ?? 0),
      })),
    });
  } catch (error) {
    console.error("listTables error:", error);
    res.status(500).json({ message: "Error listing tables" });
  }
};

// GET /api/admin/db/tables/:table
export const getTableData = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const table = await resolveTable(req.params.table);
    if (!table) {
      res.status(404).json({ message: "Table not found" });
      return;
    }

    const columns = await getColumnMeta(table);
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(200, Math.max(1, Number(req.query.limit) || 25));
    const offset = (page - 1) * limit;
    const search =
      typeof req.query.search === "string" ? req.query.search.trim() : "";

    const replacements: Record<string, unknown> = { limit, offset };
    let whereClause = "";
    if (search) {
      // ILIKE across text-ish columns only.
      const textCols = columns.filter((c) =>
        ["character varying", "text", "character", "citext"].includes(
          c.dataType,
        ),
      );
      if (textCols.length) {
        const parts = textCols.map((c, i) => {
          replacements[`s${i}`] = `%${search}%`;
          return `${quoteIdent(c.name)}::text ILIKE :s${i}`;
        });
        whereClause = `WHERE ${parts.join(" OR ")}`;
      }
    }

    const pkCols = columns.filter((c) => c.isPrimaryKey);
    const orderBy = pkCols.length
      ? `ORDER BY ${pkCols.map((c) => quoteIdent(c.name)).join(", ")} DESC`
      : "";

    const countRows = await sequelize.query<{ count: string }>(
      `SELECT COUNT(*)::int AS count FROM ${quoteIdent(table)} ${whereClause}`,
      { type: QueryTypes.SELECT, replacements },
    );
    const total = Number(countRows[0]?.count ?? 0);

    const rows = await sequelize.query(
      `SELECT * FROM ${quoteIdent(table)} ${whereClause} ${orderBy} LIMIT :limit OFFSET :offset`,
      { type: QueryTypes.SELECT, replacements },
    );

    res.status(200).json({
      table,
      columns,
      rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    console.error("getTableData error:", error);
    res.status(500).json({ message: "Error fetching table data" });
  }
};

// POST /api/admin/db/tables/:table
export const createRow = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const table = await resolveTable(req.params.table);
    if (!table) {
      res.status(404).json({ message: "Table not found" });
      return;
    }
    const columns = await getColumnMeta(table);
    const colByName = new Map(columns.map((c) => [c.name, c]));
    const body = (req.body ?? {}) as Record<string, unknown>;

    const cols: string[] = [];
    const placeholders: string[] = [];
    const replacements: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(body)) {
      const col = colByName.get(key);
      if (!col || col.isGenerated) continue;
      cols.push(quoteIdent(col.name));
      placeholders.push(`:${col.name}`);
      replacements[col.name] = coerceValue(value, col);
    }

    if (!cols.length) {
      res.status(400).json({ message: "No valid columns provided" });
      return;
    }

    const rows = await sequelize.query(
      `INSERT INTO ${quoteIdent(table)} (${cols.join(", ")})
         VALUES (${placeholders.join(", ")}) RETURNING *`,
      { type: QueryTypes.SELECT, replacements },
    );
    res.status(201).json({ row: rows[0] });
  } catch (error: any) {
    console.error("createRow error:", error);
    res
      .status(400)
      .json({ message: error?.message || "Error creating row" });
  }
};

// PUT /api/admin/db/tables/:table
export const updateRow = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const table = await resolveTable(req.params.table);
    if (!table) {
      res.status(404).json({ message: "Table not found" });
      return;
    }
    const columns = await getColumnMeta(table);
    const colByName = new Map(columns.map((c) => [c.name, c]));
    const pkCols = columns.filter((c) => c.isPrimaryKey);
    if (!pkCols.length) {
      res
        .status(400)
        .json({ message: "Table has no primary key; cannot update safely" });
      return;
    }

    const body = (req.body ?? {}) as {
      values?: Record<string, unknown>;
      pk?: Record<string, unknown>;
    };
    const values = body.values ?? {};
    const pk = body.pk ?? {};

    const replacements: Record<string, unknown> = {};
    const sets: string[] = [];
    for (const [key, value] of Object.entries(values)) {
      const col = colByName.get(key);
      if (!col || col.isPrimaryKey || col.isGenerated) continue;
      sets.push(`${quoteIdent(col.name)} = :set_${col.name}`);
      replacements[`set_${col.name}`] = coerceValue(value, col);
    }
    if (!sets.length) {
      res.status(400).json({ message: "No updatable columns provided" });
      return;
    }

    const whereParts: string[] = [];
    for (const col of pkCols) {
      if (!(col.name in pk)) {
        res
          .status(400)
          .json({ message: `Missing primary key value: ${col.name}` });
        return;
      }
      whereParts.push(`${quoteIdent(col.name)} = :pk_${col.name}`);
      replacements[`pk_${col.name}`] = pk[col.name];
    }

    const rows = await sequelize.query(
      `UPDATE ${quoteIdent(table)} SET ${sets.join(", ")}
         WHERE ${whereParts.join(" AND ")} RETURNING *`,
      { type: QueryTypes.SELECT, replacements },
    );
    if (!rows.length) {
      res.status(404).json({ message: "Row not found" });
      return;
    }
    res.status(200).json({ row: rows[0] });
  } catch (error: any) {
    console.error("updateRow error:", error);
    res.status(400).json({ message: error?.message || "Error updating row" });
  }
};

// DELETE /api/admin/db/tables/:table
export const deleteRow = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const table = await resolveTable(req.params.table);
    if (!table) {
      res.status(404).json({ message: "Table not found" });
      return;
    }
    const columns = await getColumnMeta(table);
    const pkCols = columns.filter((c) => c.isPrimaryKey);
    if (!pkCols.length) {
      res
        .status(400)
        .json({ message: "Table has no primary key; cannot delete safely" });
      return;
    }

    const pk = ((req.body ?? {}) as { pk?: Record<string, unknown> }).pk ?? {};
    const replacements: Record<string, unknown> = {};
    const whereParts: string[] = [];
    for (const col of pkCols) {
      if (!(col.name in pk)) {
        res
          .status(400)
          .json({ message: `Missing primary key value: ${col.name}` });
        return;
      }
      whereParts.push(`${quoteIdent(col.name)} = :pk_${col.name}`);
      replacements[`pk_${col.name}`] = pk[col.name];
    }

    const [, meta] = await sequelize.query(
      `DELETE FROM ${quoteIdent(table)} WHERE ${whereParts.join(" AND ")}`,
      { replacements },
    );
    const affected = (meta as any)?.rowCount ?? 0;
    if (!affected) {
      res.status(404).json({ message: "Row not found" });
      return;
    }
    res.status(200).json({ message: "Row deleted" });
  } catch (error: any) {
    console.error("deleteRow error:", error);
    res.status(400).json({ message: error?.message || "Error deleting row" });
  }
};
