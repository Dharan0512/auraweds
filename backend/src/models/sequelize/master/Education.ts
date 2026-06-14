import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface EducationAttributes {
  id: number;
  level: "School" | "UG" | "PG" | "Doctorate";
  name: string;
  isActive: boolean;
}

interface EducationCreationAttributes extends Optional<
  EducationAttributes,
  "id" | "isActive"
> {}

export class Education
  extends Model<EducationAttributes, EducationCreationAttributes>
  implements EducationAttributes
{
  public id!: number;
  public level!: "School" | "UG" | "PG" | "Doctorate";
  public name!: string;
  public isActive!: boolean;
}

Education.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    level: {
      type: DataTypes.ENUM(
        "School",
        "UG",
        "PG",
        "Doctorate",
        "SSLC",
        "HSC",
        "Diploma",
        "ITI",
        "Other",
      ),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "educations",
    timestamps: false,
  },
);
