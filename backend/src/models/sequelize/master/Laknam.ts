import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface LaknamAttributes {
  id: number;
  name: string;
  isActive: boolean;
}

interface LaknamCreationAttributes extends Optional<
  LaknamAttributes,
  "id" | "isActive"
> {}

export class Laknam
  extends Model<LaknamAttributes, LaknamCreationAttributes>
  implements LaknamAttributes
{
  public id!: number;
  public name!: string;
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "laknams",
    timestamps: false,
  },
);
