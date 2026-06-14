import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";

interface SuccessStoryAttributes {
  id: number;
  partner1Id: number;
  partner2Id: number;
  status: "engagement" | "married";
  storyText: string | null;
  weddingDate: Date | null;
}

interface SuccessStoryCreationAttributes extends Optional<
  SuccessStoryAttributes,
  "id" | "storyText" | "weddingDate"
> {}

export class SuccessStory
  extends Model<SuccessStoryAttributes, SuccessStoryCreationAttributes>
  implements SuccessStoryAttributes
{
  public id!: number;
  public partner1Id!: number;
  public partner2Id!: number;
  public status!: "engagement" | "married";
  public storyText!: string | null;
  public weddingDate!: Date | null;
}

SuccessStory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    partner1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    partner2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    status: { type: DataTypes.ENUM("engagement", "married"), allowNull: false },
    storyText: { type: DataTypes.TEXT, allowNull: true },
    weddingDate: { type: DataTypes.DATEONLY, allowNull: true },
  },
  {
    sequelize,
    tableName: "success_stories",
    timestamps: true,
  },
);
