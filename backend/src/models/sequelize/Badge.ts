import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { UserProfile } from "./UserProfile";

interface BadgeAttributes {
  id: number;
  userProfileId: number;
  mobileVerified: boolean;
  emailVerified: boolean;
  idVerified: boolean;
  adminApproved: boolean;
  premiumMember: boolean;
  horoscopeAvailable: boolean;
  highIntent: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BadgeCreationAttributes extends Optional<
  BadgeAttributes,
  | "id"
  | "mobileVerified"
  | "emailVerified"
  | "idVerified"
  | "adminApproved"
  | "premiumMember"
  | "horoscopeAvailable"
  | "highIntent"
> {}

export class Badge
  extends Model<BadgeAttributes, BadgeCreationAttributes>
  implements BadgeAttributes
{
  public id!: number;
  public userProfileId!: number;
  public mobileVerified!: boolean;
  public emailVerified!: boolean;
  public idVerified!: boolean;
  public adminApproved!: boolean;
  public premiumMember!: boolean;
  public horoscopeAvailable!: boolean;
  public highIntent!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Badge.init(
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
    mobileVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    emailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    idVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    adminApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
    premiumMember: { type: DataTypes.BOOLEAN, defaultValue: false },
    horoscopeAvailable: { type: DataTypes.BOOLEAN, defaultValue: false },
    highIntent: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    tableName: "badges",
    timestamps: true,
  },
);
