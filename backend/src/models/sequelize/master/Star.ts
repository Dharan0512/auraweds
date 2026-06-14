import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface StarAttributes {
  id: number;
  name: string;
  taName: string | null;
  isActive: boolean;
}

interface StarCreationAttributes extends Optional<
  StarAttributes,
  "id" | "taName" | "isActive"
> {}

export class Star
  extends Model<StarAttributes, StarCreationAttributes>
  implements StarAttributes
{
  public id!: number;
  public name!: string;
  public taName!: string | null;
  public isActive!: boolean;
}

Star.init(
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
    tableName: "nakshatras",
    timestamps: false,
  },
);
