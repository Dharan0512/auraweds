import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { UserProfile } from "./UserProfile";

interface FamilyDetailsAttributes {
  id: number;
  userProfileId: number;
  fatherName: string | null;
  fatherOccupation: string | null;
  motherName: string | null;
  motherOccupation: string | null;
  familyType: "Joint" | "Nuclear" | "Other" | null;
  familyStatus:
    | "Middle Class"
    | "Upper Middle Class"
    | "Rich"
    | "Affluent"
    | null;
  siblingsCount: number;
  ownHouse: boolean | null;
  nativeDistrict: string | null;
  familyLocation: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface FamilyDetailsCreationAttributes extends Optional<
  FamilyDetailsAttributes,
  | "id"
  | "fatherName"
  | "fatherOccupation"
  | "motherName"
  | "motherOccupation"
  | "familyType"
  | "familyStatus"
  | "siblingsCount"
  | "ownHouse"
  | "nativeDistrict"
  | "familyLocation"
> {}

export class FamilyDetails
  extends Model<FamilyDetailsAttributes, FamilyDetailsCreationAttributes>
  implements FamilyDetailsAttributes
{
  public id!: number;
  public userProfileId!: number;
  public fatherName!: string | null;
  public fatherOccupation!: string | null;
  public motherName!: string | null;
  public motherOccupation!: string | null;
  public familyType!: "Joint" | "Nuclear" | "Other" | null;
  public familyStatus!:
    | "Middle Class"
    | "Upper Middle Class"
    | "Rich"
    | "Affluent"
    | null;
  public siblingsCount!: number;
  public ownHouse!: boolean | null;
  public nativeDistrict!: string | null;
  public familyLocation!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FamilyDetails.init(
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
    fatherName: { type: DataTypes.STRING(100), allowNull: true },
    fatherOccupation: { type: DataTypes.STRING(100), allowNull: true },
    motherName: { type: DataTypes.STRING(100), allowNull: true },
    motherOccupation: { type: DataTypes.STRING(100), allowNull: true },
    familyType: {
      type: DataTypes.ENUM("Joint", "Nuclear", "Other"),
      allowNull: true,
    },
    familyStatus: {
      type: DataTypes.ENUM(
        "Middle Class",
        "Upper Middle Class",
        "Rich",
        "Affluent",
      ),
      allowNull: true,
    },
    siblingsCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    ownHouse: { type: DataTypes.BOOLEAN, allowNull: true },
    nativeDistrict: { type: DataTypes.STRING(100), allowNull: true },
    familyLocation: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    sequelize,
    tableName: "family_details",
    timestamps: true,
  },
);
