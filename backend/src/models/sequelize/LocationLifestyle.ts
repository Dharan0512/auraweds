import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { UserProfile } from "./UserProfile";

interface LocationLifestyleAttributes {
  id: number;
  userProfileId: number;
  country: string | null;
  state: string | null;
  city: string | null;
  relocatePreference: "Yes" | "No" | "Flexible" | null;
  diet: "Veg" | "Non-veg" | "Eggetarian" | "Vegan" | null;
  drink: "Yes" | "No" | "Occasionally" | null;
  smoke: "Yes" | "No" | "Occasionally" | null;
  fitnessLevel: "Regular" | "Occasional" | "Not at all" | null;
  // Step 6: Personality Scales (1-5)
  ambition: number | null;
  familyOrientation: number | null;
  emotionalStability: number | null;
  communicationStyle: number | null;
  spiritualInclination: number | null;
  languages: any | null; // JSONB
  hobbies: any | null; // JSONB
  createdAt?: Date;
  updatedAt?: Date;
}

interface LocationLifestyleCreationAttributes extends Optional<
  LocationLifestyleAttributes,
  | "id"
  | "country"
  | "state"
  | "city"
  | "relocatePreference"
  | "diet"
  | "drink"
  | "smoke"
  | "fitnessLevel"
  | "ambition"
  | "familyOrientation"
  | "emotionalStability"
  | "communicationStyle"
  | "spiritualInclination"
  | "languages"
  | "hobbies"
> {}

export class LocationLifestyle
  extends Model<
    LocationLifestyleAttributes,
    LocationLifestyleCreationAttributes
  >
  implements LocationLifestyleAttributes
{
  public id!: number;
  public userProfileId!: number;
  public country!: string | null;
  public state!: string | null;
  public city!: string | null;
  public relocatePreference!: "Yes" | "No" | "Flexible" | null;
  public diet!: "Veg" | "Non-veg" | "Eggetarian" | "Vegan" | null;
  public drink!: "Yes" | "No" | "Occasionally" | null;
  public smoke!: "Yes" | "No" | "Occasionally" | null;
  public fitnessLevel!: "Regular" | "Occasional" | "Not at all" | null;
  public ambition!: number | null;
  public familyOrientation!: number | null;
  public emotionalStability!: number | null;
  public communicationStyle!: number | null;
  public spiritualInclination!: number | null;
  public languages!: any | null;
  public hobbies!: any | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LocationLifestyle.init(
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
    country: { type: DataTypes.STRING(100), allowNull: true },
    state: { type: DataTypes.STRING(100), allowNull: true },
    city: { type: DataTypes.STRING(100), allowNull: true },
    relocatePreference: {
      type: DataTypes.ENUM("Yes", "No", "Flexible"),
      allowNull: true,
    },
    diet: {
      type: DataTypes.ENUM("Veg", "Non-veg", "Eggetarian", "Vegan"),
      allowNull: true,
    },
    drink: {
      type: DataTypes.ENUM("Yes", "No", "Occasionally"),
      allowNull: true,
    },
    smoke: {
      type: DataTypes.ENUM("Yes", "No", "Occasionally"),
      allowNull: true,
    },
    fitnessLevel: {
      type: DataTypes.ENUM("Regular", "Occasional", "Not at all"),
      allowNull: true,
    },
    ambition: { type: DataTypes.INTEGER, allowNull: true },
    familyOrientation: { type: DataTypes.INTEGER, allowNull: true },
    emotionalStability: { type: DataTypes.INTEGER, allowNull: true },
    communicationStyle: { type: DataTypes.INTEGER, allowNull: true },
    spiritualInclination: { type: DataTypes.INTEGER, allowNull: true },
    languages: { type: DataTypes.JSONB, allowNull: true },
    hobbies: { type: DataTypes.JSONB, allowNull: true },
  },
  {
    sequelize,
    tableName: "location_lifestyle",
    timestamps: true,
  },
);
