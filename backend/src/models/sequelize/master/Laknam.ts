import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface LaknamAttributes {
  id: number;
  name: string;
  taName: string | null;
  isActive: boolean;
}

interface LaknamCreationAttributes extends Optional<
  LaknamAttributes,
  "id" | "taName" | "isActive"
> {}

export class Laknam
  extends Model<LaknamAttributes, LaknamCreationAttributes>
  implements LaknamAttributes
{
  public id!: number;
  public name!: string;
  public taName!: string | null;
  public isActive!: boolean;
}

Laknam.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    taName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "ta_name",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: "isActive",
    },
  },
  {
    sequelize,
    tableName: "lagnams",
    timestamps: false,
  },
);
