import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface StarAttributes {
  id: number;
  name: string;
  isActive: boolean;
}

interface StarCreationAttributes extends Optional<
  StarAttributes,
  "id" | "isActive"
> {}

export class Star
  extends Model<StarAttributes, StarCreationAttributes>
  implements StarAttributes
{
  public id!: number;
  public name!: string;
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "stars",
    timestamps: false,
  },
);
