import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface RasiAttributes {
  id: number;
  name: string;
  taName: string | null;
  isActive: boolean;
}

interface RasiCreationAttributes extends Optional<
  RasiAttributes,
  "id" | "taName" | "isActive"
> {}

export class Rasi
  extends Model<RasiAttributes, RasiCreationAttributes>
  implements RasiAttributes
{
  public id!: number;
  public name!: string;
  public taName!: string | null;
  public isActive!: boolean;
}

Rasi.init(
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
    tableName: "rasis",
    timestamps: false,
  },
);
