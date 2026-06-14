import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface GothramAttributes {
  id: number;
  name: string;
  isActive: boolean;
}

interface GothramCreationAttributes extends Optional<
  GothramAttributes,
  "id" | "isActive"
> {}

export class Gothram
  extends Model<GothramAttributes, GothramCreationAttributes>
  implements GothramAttributes
{
  public id!: number;
  public name!: string;
  public isActive!: boolean;
}

Gothram.init(
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
    tableName: "gothrams",
    timestamps: false,
  },
);
