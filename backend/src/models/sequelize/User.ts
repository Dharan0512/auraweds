import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";

interface UserAttributes {
  id: number;
  createdFor:
    | "Myself"
    | "Daughter"
    | "Son"
    | "Sister"
    | "Brother"
    | "Relative"
    | "Friend"
    | "Self"
    | "Parent"
    | "Guardian";
  gender: "Male" | "Female" | "Other";
  firstName: string;
  lastName: string | null;
  countryCodeId: number | null;
  mobile: string | null;
  email: string;
  passwordHash: string;
  role: "admin" | "user";
  isActive: boolean;
  lastLoginAt: Date | null;
  ipAddress: string | null;
  deletedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<
  UserAttributes,
  | "id"
  | "createdFor"
  | "lastName"
  | "countryCodeId"
  | "mobile"
  | "role"
  | "isActive"
  | "lastLoginAt"
  | "ipAddress"
  | "deletedAt"
> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public createdFor!:
    | "Myself"
    | "Daughter"
    | "Son"
    | "Sister"
    | "Brother"
    | "Relative"
    | "Friend"
    | "Self"
    | "Parent"
    | "Guardian";
  public gender!: "Male" | "Female" | "Other";
  public firstName!: string;
  public lastName!: string | null;
  public countryCodeId!: number | null;
  public mobile!: string | null;
  public email!: string;
  public passwordHash!: string;
  public role!: "admin" | "user";
  public isActive!: boolean;
  public lastLoginAt!: Date | null;
  public ipAddress!: string | null;
  public deletedAt!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    createdFor: {
      type: DataTypes.ENUM(
        "Myself",
        "Daughter",
        "Son",
        "Sister",
        "Brother",
        "Relative",
        "Friend",
        "Self",
        "Parent",
        "Guardian",
      ),
      defaultValue: "Myself",
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    countryCodeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING(45), // Supports IPv6
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    paranoid: true, // Enables soft deletes using `deletedAt`
  },
);
