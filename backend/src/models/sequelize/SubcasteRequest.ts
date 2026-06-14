import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";
import { Caste } from "./master/Caste";
import { Subcaste } from "./master/Subcaste";
import type { RequestStatus } from "./CasteRequest";

interface SubcasteRequestAttributes {
  id: number;
  userId: number;
  casteId: number;
  name: string;
  status: RequestStatus;
  reviewedBy: number | null;
  mergedIntoSubcasteId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SubcasteRequestCreationAttributes extends Optional<
  SubcasteRequestAttributes,
  "id" | "status" | "reviewedBy" | "mergedIntoSubcasteId"
> {}

export class SubcasteRequest
  extends Model<SubcasteRequestAttributes, SubcasteRequestCreationAttributes>
  implements SubcasteRequestAttributes
{
  public id!: number;
  public userId!: number;
  public casteId!: number;
  public name!: string;
  public status!: RequestStatus;
  public reviewedBy!: number | null;
  public mergedIntoSubcasteId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SubcasteRequest.init(
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
    casteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Caste, key: "id" },
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
    mergedIntoSubcasteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Subcaste, key: "id" },
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "subcaste_requests",
    timestamps: true,
  },
);

SubcasteRequest.belongsTo(User, { foreignKey: "userId" });
SubcasteRequest.belongsTo(Caste, { foreignKey: "casteId" });
