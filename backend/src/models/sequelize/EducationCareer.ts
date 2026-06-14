import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { UserProfile } from "./UserProfile";

interface EducationCareerAttributes {
  id: number;
  userProfileId: number;
  highestEducation: string | null;
  fieldOfStudy: string | null;
  college: string | null;
  employmentType: string | null;
  companyName: string | null;
  designation: string | null;
  incomeRange: string | null;
  exactIncome: number | null;
  assets: any | null; // JSONB
  careerPlanAfterMarriage: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EducationCareerCreationAttributes extends Optional<
  EducationCareerAttributes,
  | "id"
  | "highestEducation"
  | "fieldOfStudy"
  | "college"
  | "employmentType"
  | "companyName"
  | "designation"
  | "incomeRange"
  | "exactIncome"
  | "assets"
  | "careerPlanAfterMarriage"
> {}

export class EducationCareer
  extends Model<EducationCareerAttributes, EducationCareerCreationAttributes>
  implements EducationCareerAttributes
{
  public id!: number;
  public userProfileId!: number;
  public highestEducation!: string | null;
  public fieldOfStudy!: string | null;
  public college!: string | null;
  public employmentType!: string | null;
  public companyName!: string | null;
  public designation!: string | null;
  public incomeRange!: string | null;
  public exactIncome!: number | null;
  public assets!: any | null;
  public careerPlanAfterMarriage!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EducationCareer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: UserProfile, key: "id" },
      onDelete: "CASCADE",
    },
    highestEducation: { type: DataTypes.STRING(255), allowNull: true },
    fieldOfStudy: { type: DataTypes.STRING(255), allowNull: true },
    college: { type: DataTypes.STRING(255), allowNull: true },
    employmentType: { type: DataTypes.STRING(100), allowNull: true },
    companyName: { type: DataTypes.STRING(255), allowNull: true },
    designation: { type: DataTypes.STRING(150), allowNull: true },
    incomeRange: { type: DataTypes.STRING(100), allowNull: true },
    exactIncome: { type: DataTypes.BIGINT, allowNull: true },
    assets: { type: DataTypes.JSONB, allowNull: true },
    careerPlanAfterMarriage: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: "education_career",
    timestamps: true,
  },
);
