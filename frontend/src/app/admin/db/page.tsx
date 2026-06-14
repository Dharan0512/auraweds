"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ColumnMeta {
  name: string;
  dataType: string;
  isNullable: boolean;
  defaultValue: string | null;
  isPrimaryKey: boolean;
  isGenerated: boolean;
}

interface TableInfo {
  name: string;
  approxRows: number;
}

type Row = Record<string, unknown>;

const authHeaders = (): Record<string, string> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const fmtCell = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const isBoolType = (t: string) => t === "boolean";
const isNumberType = (t: string) =>
  [
    "integer",
    "bigint",
    "smallint",
    "numeric",
    "double precision",
    "real",
    "decimal",
  ].includes(t);
const isLongText = (t: string) =>
  ["text", "json", "jsonb"].includes(t);

export default function AdminDbPage() {
  const router = useRouter();
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [tableFilter, setTableFilter] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const [columns, setColumns] = useState<ColumnMeta[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Modal state: mode "create" | "edit", form values
  const [modalMode, setModalMode] = useState<null | "create" | "edit">(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);

  const handleAuthError = useCallback(
    (status: number) => {
      if (status === 401 || status === 403) {
        router.push("/");
        return true;
      }
      return false;
    },
    [router],
  );

  // Load table list once.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/admin/db/tables`, {
          headers: authHeaders(),
        });
        if (handleAuthError(res.status)) return;
        if (!res.ok) throw new Error("Failed to load tables");
        const data = await res.json();
        // Normalise: the API may return strings or objects; keep only named entries.
        const normalised: TableInfo[] = (data.tables || [])
          .map((t: unknown) =>
            typeof t === "string"
              ? { name: t, approxRows: 0 }
              : (t as TableInfo),
          )
          .filter((t: TableInfo) => t && typeof t.name === "string");
        setTables(normalised);
      } catch (e) {
        setError((e as Error).message);
      }
    })();
  }, [handleAuthError]);

  const loadTable = useCallback(
    async (table: string, p: number, q: string) => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `${API}/api/admin/db/tables/${encodeURIComponent(table)}?page=${p}&limit=25&search=${encodeURIComponent(q)}`,
          { headers: authHeaders() },
        );
        if (handleAuthError(res.status)) return;
        if (!res.ok) throw new Error("Failed to load table data");
        const data = await res.json();
        setColumns(data.columns || []);
        setRows(data.rows || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [handleAuthError],
  );

  useEffect(() => {
    if (selected) loadTable(selected, page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, page]);

  const selectTable = (name: string) => {
    setSelected(name);
    setPage(1);
    setSearch("");
  };

  const refresh = () => selected && loadTable(selected, page, search);

  const pkCols = useMemo(
    () => columns.filter((c) => c.isPrimaryKey),
    [columns],
  );

  const pkOf = (row: Row): Record<string, unknown> => {
    const pk: Record<string, unknown> = {};
    pkCols.forEach((c) => (pk[c.name] = row[c.name]));
    return pk;
  };

  // ---- Modal helpers ----
  const openCreate = () => {
    const init: Record<string, string> = {};
    columns.forEach((c) => {
      if (!c.isGenerated) init[c.name] = "";
    });
    setForm(init);
    setEditingRow(null);
    setModalMode("create");
  };

  const openEdit = (row: Row) => {
    const init: Record<string, string> = {};
    columns.forEach((c) => {
      const v = row[c.name];
      init[c.name] =
        v === null || v === undefined
          ? ""
          : typeof v === "object"
            ? JSON.stringify(v)
            : String(v);
    });
    setForm(init);
    setEditingRow(row);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingRow(null);
    setForm({});
  };

  const parseValue = (col: ColumnMeta, raw: string): unknown => {
    if (raw === "") return null;
    if (isBoolType(col.dataType)) return raw === "true";
    if (col.dataType === "json" || col.dataType === "jsonb") {
      try {
        return JSON.parse(raw);
      } catch {
        return raw;
      }
    }
    return raw;
  };

  const submitModal = async () => {
    if (!selected) return;
    setSaving(true);
    setError("");
    try {
      if (modalMode === "create") {
        const payload: Record<string, unknown> = {};
        columns.forEach((c) => {
          if (c.isGenerated) return;
          if (form[c.name] !== undefined && form[c.name] !== "") {
            payload[c.name] = parseValue(c, form[c.name]);
          }
        });
        const res = await fetch(
          `${API}/api/admin/db/tables/${encodeURIComponent(selected)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", ...authHeaders() },
            body: JSON.stringify(payload),
          },
        );
        if (handleAuthError(res.status)) return;
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.message || "Create failed");
        }
      } else if (modalMode === "edit" && editingRow) {
        const values: Record<string, unknown> = {};
        columns.forEach((c) => {
          if (c.isPrimaryKey || c.isGenerated) return;
          values[c.name] = parseValue(c, form[c.name] ?? "");
        });
        const res = await fetch(
          `${API}/api/admin/db/tables/${encodeURIComponent(selected)}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json", ...authHeaders() },
            body: JSON.stringify({ values, pk: pkOf(editingRow) }),
          },
        );
        if (handleAuthError(res.status)) return;
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.message || "Update failed");
        }
      }
      closeModal();
      refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const deleteRow = async (row: Row) => {
    if (!selected) return;
    if (!confirm("Delete this row? This cannot be undone.")) return;
    setError("");
    try {
      const res = await fetch(
        `${API}/api/admin/db/tables/${encodeURIComponent(selected)}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify({ pk: pkOf(row) }),
        },
      );
      if (handleAuthError(res.status)) return;
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || "Delete failed");
      }
      refresh();
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const filteredTables = tables.filter((t) =>
    (t?.name ?? "").toLowerCase().includes(tableFilter.toLowerCase()),
  );

  return (
    <div className="flex h-full text-gray-900 font-sans overflow-hidden">
      {/* Table list */}
      <div className="w-64 border-r border-gray-100 bg-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-800 mb-2">Tables</h2>
          <input
            type="text"
            placeholder="Filter tables..."
            value={tableFilter}
            onChange={(e) => setTableFilter(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]/40"
          />
        </div>
        <div className="overflow-y-auto flex-1">
          {filteredTables.map((t) => (
            <button
              key={t.name}
              onClick={() => selectTable(t.name)}
              className={`w-full flex items-center justify-between text-left px-4 py-2 text-xs border-b border-gray-50 transition-colors ${
                selected === t.name
                  ? "bg-[#faf5ff] text-[#6A0DAD] font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="truncate">{t.name}</span>
              <span className="text-[10px] text-gray-400 ml-2">
                {t.approxRows}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col h-full overflow-hidden p-8">
        {error && (
          <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {!selected ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a table from the left to view and manage its rows.
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6 gap-4 flex-wrap flex-shrink-0">
              <div>
                <h1 className="text-2xl font-bold">{selected}</h1>
                <p className="text-xs text-gray-500">{total} rows</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search rows..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setPage(1);
                      loadTable(selected, 1, search);
                    }
                  }}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]/40"
                />
                <button
                  onClick={openCreate}
                  className="px-4 py-2 bg-[#6A0DAD] text-white text-sm font-medium rounded-lg hover:bg-[#580b91]"
                >
                  + Add Row
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="overflow-auto flex-1 min-h-0">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="sticky top-0 bg-gray-50 z-10 shadow-sm">
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                      {columns.map((c) => (
                        <th
                          key={c.name}
                          className="p-3 font-semibold whitespace-nowrap bg-gray-50"
                        >
                          {c.name}
                          {c.isPrimaryKey && (
                            <span className="ml-1 text-[#6A0DAD]">★</span>
                          )}
                        </th>
                      ))}
                      <th className="p-3 font-semibold text-right sticky right-0 top-0 bg-gray-50 z-20">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr>
                        <td
                          colSpan={columns.length + 1}
                          className="p-8 text-center text-gray-500"
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : rows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={columns.length + 1}
                          className="p-8 text-center text-gray-500"
                        >
                          No rows.
                        </td>
                      </tr>
                    ) : (
                      rows.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50/50">
                          {columns.map((c) => {
                            const text = fmtCell(row[c.name]);
                            return (
                              <td
                                key={c.name}
                                className="p-3 max-w-[240px] truncate"
                                title={text}
                              >
                                {text}
                              </td>
                            );
                          })}
                          <td className="p-3 text-right whitespace-nowrap sticky right-0 bg-white z-10">
                            <button
                              onClick={() => openEdit(row)}
                              className="text-xs font-medium px-3 py-1 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100 mr-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteRow(row)}
                              disabled={pkCols.length === 0}
                              className="text-xs font-medium px-3 py-1 rounded-md border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-40"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 flex-shrink-0">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600 font-medium">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add / Edit modal */}
      {modalMode && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] flex flex-col">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {modalMode === "create" ? "Add Row" : "Edit Row"} ·{" "}
                <span className="text-gray-500 font-normal">{selected}</span>
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-700 text-xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-5 overflow-y-auto space-y-4">
              {columns.map((c) => {
                const readOnly =
                  modalMode === "edit" && (c.isPrimaryKey || c.isGenerated);
                const skipCreate = modalMode === "create" && c.isGenerated;
                if (skipCreate) return null;
                return (
                  <div key={c.name}>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {c.name}
                      <span className="ml-2 font-normal text-gray-400">
                        {c.dataType}
                        {!c.isNullable && !c.isGenerated ? " · required" : ""}
                        {c.isPrimaryKey ? " · PK" : ""}
                      </span>
                    </label>
                    {isBoolType(c.dataType) ? (
                      <select
                        value={form[c.name] ?? ""}
                        disabled={readOnly}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [c.name]: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]/40 disabled:bg-gray-100"
                      >
                        <option value="">— null —</option>
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    ) : isLongText(c.dataType) ? (
                      <textarea
                        rows={3}
                        value={form[c.name] ?? ""}
                        readOnly={readOnly}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [c.name]: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]/40 read-only:bg-gray-100"
                      />
                    ) : (
                      <input
                        type={isNumberType(c.dataType) ? "number" : "text"}
                        value={form[c.name] ?? ""}
                        readOnly={readOnly}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [c.name]: e.target.value }))
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A0DAD]/40 read-only:bg-gray-100"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={submitModal}
                disabled={saving}
                className="px-5 py-2 bg-[#6A0DAD] text-white text-sm font-medium rounded-lg hover:bg-[#580b91] disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
