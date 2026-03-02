import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";
import { Plan } from "./Plan";

interface SubscriptionAttributes {
  id: number;
  userId: number;
  planId: number;
  startDate: Date;
  endDate: Date;
  status: "active" | "expired" | "cancelled" | "cancelled_pending";
  createdAt?: Date;
}

interface SubscriptionCreationAttributes extends Optional<
  SubscriptionAttributes,
  "id" | "startDate" | "status"
> {}

export class Subscription
  extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
  implements SubscriptionAttributes
{
  public id!: number;
  public userId!: number;
  public planId!: number;
  public startDate!: Date;
  public endDate!: Date;
  public status!: "active" | "expired" | "cancelled" | "cancelled_pending";
  public Plan?: Plan;

  public readonly createdAt!: Date;
}

Subscription.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    planId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: Plan, key: "id" },
      onDelete: "CASCADE",
    },
    startDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "active",
        "expired",
        "cancelled",
        "cancelled_pending",
      ),
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "subscriptions",
    timestamps: true,
    updatedAt: false,
  },
);

User.hasMany(Subscription, { foreignKey: "userId" });
Subscription.belongsTo(User, { foreignKey: "userId" });

Plan.hasMany(Subscription, { foreignKey: "planId" });
Subscription.belongsTo(Plan, { foreignKey: "planId" });
