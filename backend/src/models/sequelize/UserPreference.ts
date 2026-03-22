import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";
import { Religion } from "./master/Religion";
import { Caste } from "./master/Caste";
import { Country } from "./master/Country";
import { State } from "./master/State";
import { Education } from "./master/Education";

interface UserPreferenceAttributes {
  id: number;
  userId: number;
  minAge: number;
  maxAge: number;
  minHeightCm: number | null;
  maxHeightCm: number | null;
  maritalStatus: string | null; // e.g. "Never Married,Divorced"
  religionId: number | null;
  casteId: number | null;
  educationId: number | null;
  countryId: number | null;
  stateId: number | null;
  // Step 6: Additional Preferences
  preferredLocation: string | null;
  preferredEducation: string | null;
  preferredIncomeRange: string | null;
  mustHave: any | null; // JSONB
  dealBreakers: any | null; // JSONB
  partnerCastes: string[] | null; // JSONB for multi-select
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserPreferenceCreationAttributes extends Optional<
  UserPreferenceAttributes,
  | "id"
  | "minAge"
  | "maxAge"
  | "minHeightCm"
  | "maxHeightCm"
  | "maritalStatus"
  | "religionId"
  | "casteId"
  | "educationId"
  | "countryId"
  | "stateId"
  | "preferredLocation"
  | "preferredEducation"
  | "preferredIncomeRange"
  | "mustHave"
  | "dealBreakers"
> {}

export class UserPreference
  extends Model<UserPreferenceAttributes, UserPreferenceCreationAttributes>
  implements UserPreferenceAttributes
{
  public id!: number;
  public userId!: number;
  public minAge!: number;
  public maxAge!: number;
  public minHeightCm!: number | null;
  public maxHeightCm!: number | null;
  public maritalStatus!: string | null;
  public religionId!: number | null;
  public casteId!: number | null;
  public educationId!: number | null;
  public countryId!: number | null;
  public stateId!: number | null;
  public preferredLocation!: string | null;
  public preferredEducation!: string | null;
  public preferredIncomeRange!: string | null;
  public mustHave!: any | null;
  public dealBreakers!: any | null;
  public partnerCastes!: string[] | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserPreference.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    minAge: { type: DataTypes.INTEGER, defaultValue: 18 },
    maxAge: { type: DataTypes.INTEGER, defaultValue: 40 },
    minHeightCm: { type: DataTypes.INTEGER, allowNull: true },
    maxHeightCm: { type: DataTypes.INTEGER, allowNull: true },
    maritalStatus: { type: DataTypes.STRING(255), allowNull: true },
    religionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Religion, key: "id" },
      onDelete: "SET NULL",
    },
    casteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Caste, key: "id" },
      onDelete: "SET NULL",
    },
    educationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Education, key: "id" },
      onDelete: "SET NULL",
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Country, key: "id" },
      onDelete: "SET NULL",
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: State, key: "id" },
      onDelete: "SET NULL",
    },
    preferredLocation: { type: DataTypes.STRING(255), allowNull: true },
    preferredEducation: { type: DataTypes.STRING(255), allowNull: true },
    preferredIncomeRange: { type: DataTypes.STRING(100), allowNull: true },
    mustHave: { type: DataTypes.JSONB, allowNull: true },
    dealBreakers: { type: DataTypes.JSONB, allowNull: true },
    partnerCastes: { type: DataTypes.JSONB, allowNull: true },
  },
  {
    sequelize,
    tableName: "user_preferences",
    timestamps: true,
  },
);

User.hasOne(UserPreference, { foreignKey: "userId" });
UserPreference.belongsTo(User, { foreignKey: "userId" });

UserPreference.belongsTo(Religion, { foreignKey: "religionId" });
Religion.hasMany(UserPreference, { foreignKey: "religionId" });

UserPreference.belongsTo(Caste, { foreignKey: "casteId" });
Caste.hasMany(UserPreference, { foreignKey: "casteId" });

UserPreference.belongsTo(Education, { foreignKey: "educationId" });
Education.hasMany(UserPreference, { foreignKey: "educationId" });

UserPreference.belongsTo(Country, { foreignKey: "countryId" });
Country.hasMany(UserPreference, { foreignKey: "countryId" });

UserPreference.belongsTo(State, { foreignKey: "stateId" });
State.hasMany(UserPreference, { foreignKey: "stateId" });
