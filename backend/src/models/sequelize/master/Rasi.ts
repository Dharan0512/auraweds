import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface RasiAttributes {
  id: number;
  name: string;
  isActive: boolean;
}

interface RasiCreationAttributes extends Optional<
  RasiAttributes,
  "id" | "isActive"
> {}

export class Rasi
  extends Model<RasiAttributes, RasiCreationAttributes>
  implements RasiAttributes
{
  public id!: number;
  public name!: string;
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "rasis",
    timestamps: false,
  },
);
