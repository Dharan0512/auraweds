import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";

interface NotificationAttributes {
  id: number;
  userId: number;
  senderId: number | null;
  type:
    | "CALL_ATTEMPT"
    | "CONNECTION_WISH"
    | "INTEREST_RECEIVED"
    | "INTEREST_ACCEPTED"
    | "PROFILE_VIEW";
  message: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface NotificationCreationAttributes extends Optional<
  NotificationAttributes,
  "id" | "senderId" | "isRead"
> {}

export class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  public id!: number;
  public userId!: number;
  public senderId!: number | null;
  public type!:
    | "CALL_ATTEMPT"
    | "CONNECTION_WISH"
    | "INTEREST_RECEIVED"
    | "INTEREST_ACCEPTED"
    | "PROFILE_VIEW";
  public message!: string;
  public isRead!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    senderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: { model: "users", key: "id" },
      onDelete: "SET NULL",
    },
    type: {
      type: DataTypes.ENUM(
        "CALL_ATTEMPT",
        "CONNECTION_WISH",
        "INTEREST_RECEIVED",
        "INTEREST_ACCEPTED",
        "PROFILE_VIEW",
        "ADMIN_BROADCAST",
        "MARKETING_OFFER",
      ),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "notifications",
    timestamps: true,
  },
);

User.hasMany(Notification, { foreignKey: "userId", as: "Notifications" });
Notification.belongsTo(User, { foreignKey: "userId" });
Notification.belongsTo(User, { foreignKey: "senderId", as: "Sender" });
