import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";
import { Subscription } from "./Subscription";

interface PaymentAttributes {
  id: number;
  userId: number;
  subscriptionId: number;
  amount: number;
  currency: string;
  paymentStatus: "pending" | "success" | "failed";
  providerTransactionId: string | null;
  createdAt?: Date;
}

interface PaymentCreationAttributes extends Optional<
  PaymentAttributes,
  "id" | "currency" | "paymentStatus" | "providerTransactionId"
> {}

export class Payment
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes
{
  public id!: number;
  public userId!: number;
  public subscriptionId!: number;
  public amount!: number;
  public currency!: string;
  public paymentStatus!: "pending" | "success" | "failed";
  public providerTransactionId!: string | null;

  public readonly createdAt!: Date;
}

Payment.init(
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
    subscriptionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Subscription, key: "id" },
      onDelete: "CASCADE",
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(10),
      defaultValue: "INR",
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "success", "failed"),
      defaultValue: "pending",
    },
    providerTransactionId: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "payments",
    timestamps: true,
    updatedAt: false,
  },
);

User.hasMany(Payment, { foreignKey: "userId" });
Payment.belongsTo(User, { foreignKey: "userId" });

Subscription.hasMany(Payment, { foreignKey: "subscriptionId" });
Payment.belongsTo(Subscription, { foreignKey: "subscriptionId" });
