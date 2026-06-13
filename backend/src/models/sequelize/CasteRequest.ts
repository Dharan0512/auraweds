import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";
import { Religion } from "./master/Religion";
import { Caste } from "./master/Caste";

export type RequestStatus = "Pending" | "Approved" | "Rejected";

interface CasteRequestAttributes {
  id: number;
  userId: number;
  religionId: number;
  name: string;
  status: RequestStatus;
  reviewedBy: number | null;
  mergedIntoCasteId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CasteRequestCreationAttributes extends Optional<
  CasteRequestAttributes,
  "id" | "status" | "reviewedBy" | "mergedIntoCasteId"
> {}

export class CasteRequest
  extends Model<CasteRequestAttributes, CasteRequestCreationAttributes>
  implements CasteRequestAttributes
{
  public id!: number;
  public userId!: number;
  public religionId!: number;
  public name!: string;
  public status!: RequestStatus;
  public reviewedBy!: number | null;
  public mergedIntoCasteId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CasteRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    religionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Religion, key: "id" },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
    reviewedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: User, key: "id" },
      onDelete: "SET NULL",
    },
    mergedIntoCasteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Caste, key: "id" },
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "caste_requests",
    timestamps: true,
  },
);

CasteRequest.belongsTo(User, { foreignKey: "userId" });
CasteRequest.belongsTo(Religion, { foreignKey: "religionId" });
