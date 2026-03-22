import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";
import { MotherTongue } from "./master/MotherTongue";
import { Religion } from "./master/Religion";
import { Caste } from "./master/Caste";
import { Country } from "./master/Country";
import { State } from "./master/State";
import { City } from "./master/City";
import { Education } from "./master/Education";
import { EmploymentType } from "./master/EmploymentType";
import { Occupation } from "./master/Occupation";
import { Currency } from "./master/Currency";
import { IncomeRange } from "./master/IncomeRange";

interface UserProfileAttributes {
  id: number;
  userId: number;
  dob: Date | null;
  heightCm: number | null;
  physicalStatus: "Normal" | "Physically Challenged";
  maritalStatus: "Never Married" | "Divorced" | "Widowed" | "Awaiting Divorce";
  childrenCount: number;
  childrenLivingWith: boolean;
  motherTongueId: number | null;
  religionId: number | null;
  casteId: number | null;
  subcaste: string | null;
  complexion: string | null;
  shortBio: string | null;
  profileStrength: number;
  convenientTimeToCall: string | null;
  linkedInUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  countryId: number | null;
  stateId: number | null;
  cityId: number | null;
  educationId: number | null;
  employmentTypeId: number | null;
  occupationId: number | null;
  incomeRangeId: number | null;
  familyStatus: string | null;
  incomeCurrencyId: number | null;
  profileVisibility: "Public" | "Members Only" | "Hidden";
  approvalStatus: "pending" | "approved" | "rejected";
  moderationReason: string | null;
  privacySettings: any | null; // JSONB
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserProfileCreationAttributes extends Optional<
  UserProfileAttributes,
  | "id"
  | "dob"
  | "heightCm"
  | "physicalStatus"
  | "maritalStatus"
  | "childrenCount"
  | "childrenLivingWith"
  | "motherTongueId"
  | "religionId"
  | "casteId"
  | "subcaste"
  | "complexion"
  | "shortBio"
  | "profileStrength"
  | "countryId"
  | "stateId"
  | "cityId"
  | "educationId"
  | "employmentTypeId"
  | "occupationId"
  | "incomeRangeId"
  | "familyStatus"
  | "incomeCurrencyId"
  | "profileVisibility"
  | "privacySettings"
  | "approvalStatus"
  | "moderationReason"
> {}

export class UserProfile
  extends Model<UserProfileAttributes, UserProfileCreationAttributes>
  implements UserProfileAttributes
{
  public id!: number;
  public userId!: number;
  public dob!: Date | null;
  public heightCm!: number | null;
  public physicalStatus!: "Normal" | "Physically Challenged";
  public maritalStatus!:
    | "Never Married"
    | "Divorced"
    | "Widowed"
    | "Awaiting Divorce";
  public childrenCount!: number;
  public childrenLivingWith!: boolean;
  public motherTongueId!: number | null;
  public religionId!: number | null;
  public casteId!: number | null;
  public subcaste!: string | null;
  public complexion!: string | null;
  public shortBio!: string | null;
  public convenientTimeToCall!: string | null;
  public linkedInUrl!: string | null;
  public instagramUrl!: string | null;
  public facebookUrl!: string | null;
  public countryId!: number | null;
  public stateId!: number | null;
  public cityId!: number | null;
  public educationId!: number | null;
  public employmentTypeId!: number | null;
  public occupationId!: number | null;
  public incomeRangeId!: number | null;
  public familyStatus!: string | null;
  public incomeCurrencyId!: number | null;
  public profileVisibility!: "Public" | "Members Only" | "Hidden";
  public profileStrength!: number;
  public approvalStatus!: "pending" | "approved" | "rejected";
  public moderationReason!: string | null;
  public privacySettings!: any | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserProfile.init(
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
    dob: { type: DataTypes.DATEONLY, allowNull: true },
    heightCm: { type: DataTypes.INTEGER, allowNull: true },
    physicalStatus: {
      type: DataTypes.STRING(50),
      defaultValue: "Normal",
      validate: {
        isIn: [["Normal", "Physically Challenged"]],
      },
    },
    maritalStatus: {
      type: DataTypes.STRING(50),
      defaultValue: "Never Married",
      validate: {
        isIn: [["Never Married", "Divorced", "Widowed", "Awaiting Divorce"]],
      },
    },
    childrenCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    childrenLivingWith: { type: DataTypes.BOOLEAN, defaultValue: false },

    // Foreign Keys to Master Tables
    motherTongueId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: MotherTongue, key: "id" },
      onDelete: "SET NULL",
    },
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
    subcaste: { type: DataTypes.STRING(100), allowNull: true },
    complexion: { type: DataTypes.STRING(50), allowNull: true },
    shortBio: { type: DataTypes.TEXT, allowNull: true },
    convenientTimeToCall: { type: DataTypes.STRING(100), allowNull: true },
    linkedInUrl: { type: DataTypes.STRING(255), allowNull: true },
    instagramUrl: { type: DataTypes.STRING(255), allowNull: true },
    facebookUrl: { type: DataTypes.STRING(255), allowNull: true },
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
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: City, key: "id" },
      onDelete: "SET NULL",
    },
    educationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Education, key: "id" },
      onDelete: "SET NULL",
    },
    employmentTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: EmploymentType, key: "id" },
      onDelete: "SET NULL",
    },
    occupationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Occupation, key: "id" },
      onDelete: "SET NULL",
    },
    incomeRangeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: IncomeRange, key: "id" },
      onDelete: "SET NULL",
    },
    familyStatus: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        isIn: [["Middle Class", "Upper Middle Class", "Rich", "Affluent"]],
      },
    },
    incomeCurrencyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Currency, key: "id" },
      onDelete: "SET NULL",
    },
    profileVisibility: {
      type: DataTypes.STRING(50),
      defaultValue: "Public",
      validate: {
        isIn: [["Public", "Members Only", "Hidden"]],
      },
    },
    approvalStatus: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
    moderationReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profileStrength: { type: DataTypes.INTEGER, defaultValue: 0 },
    privacySettings: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {
        showExactIncome: false,
        showFamilyDetails: true,
        showBirthDetails: true,
        showSocialLinks: true,
        showValues: true,
        showHoroscope: true,
        showAstroMatch: true,
      },
    },
  },
  {
    sequelize,
    tableName: "user_profiles",
    timestamps: true,
  },
);

User.hasOne(UserProfile, { foreignKey: "userId" });
UserProfile.belongsTo(User, { foreignKey: "userId" });

// Define all associations to master tables down the line
UserProfile.belongsTo(MotherTongue, { foreignKey: "motherTongueId" });
MotherTongue.hasMany(UserProfile, { foreignKey: "motherTongueId" });

UserProfile.belongsTo(Religion, { foreignKey: "religionId" });
Religion.hasMany(UserProfile, { foreignKey: "religionId" });

UserProfile.belongsTo(Caste, { foreignKey: "casteId" });
Caste.hasMany(UserProfile, { foreignKey: "casteId" });

UserProfile.belongsTo(Country, { foreignKey: "countryId" });
Country.hasMany(UserProfile, { foreignKey: "countryId" });

UserProfile.belongsTo(State, { foreignKey: "stateId" });
State.hasMany(UserProfile, { foreignKey: "stateId" });

UserProfile.belongsTo(City, { foreignKey: "cityId" });
City.hasMany(UserProfile, { foreignKey: "cityId" });

UserProfile.belongsTo(Education, { foreignKey: "educationId" });
Education.hasMany(UserProfile, { foreignKey: "educationId" });

UserProfile.belongsTo(EmploymentType, { foreignKey: "employmentTypeId" });
EmploymentType.hasMany(UserProfile, { foreignKey: "employmentTypeId" });

UserProfile.belongsTo(Occupation, { foreignKey: "occupationId" });
Occupation.hasMany(UserProfile, { foreignKey: "occupationId" });

UserProfile.belongsTo(IncomeRange, { foreignKey: "incomeRangeId" });
IncomeRange.hasMany(UserProfile, { foreignKey: "incomeRangeId" });

UserProfile.belongsTo(Currency, { foreignKey: "incomeCurrencyId" });
Currency.hasMany(UserProfile, { foreignKey: "incomeCurrencyId" });
