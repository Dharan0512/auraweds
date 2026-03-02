import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";

interface InterestAttributes {
  id: number;
  senderId: number;
  receiverId: number;
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "WITHDRAWN" | "EXPIRED";
  viewedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface InterestCreationAttributes extends Optional<
  InterestAttributes,
  "id" | "status" | "viewedAt"
> {}

export class Interest
  extends Model<InterestAttributes, InterestCreationAttributes>
  implements InterestAttributes
{
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public status!: "PENDING" | "ACCEPTED" | "DECLINED" | "WITHDRAWN" | "EXPIRED";
  public viewedAt?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Interest.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    receiverId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "ACCEPTED",
        "DECLINED",
        "WITHDRAWN",
        "EXPIRED",
      ),
      defaultValue: "PENDING",
    },
    viewedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "interests",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["senderId", "receiverId"],
        where: {
          status: "PENDING",
        },
        name: "unique_pending_interest",
      },
      {
        fields: ["senderId", "status", "createdAt"],
        name: "idx_interests_sender_status",
      },
      {
        fields: ["receiverId", "status", "createdAt"],
        name: "idx_interests_receiver_status",
      },
      {
        fields: ["status"],
        name: "idx_interests_status",
      },
    ],
  },
);

User.hasMany(Interest, { foreignKey: "senderId", as: "SentInterests" });
Interest.belongsTo(User, { foreignKey: "senderId", as: "Sender" });

User.hasMany(Interest, { foreignKey: "receiverId", as: "ReceivedInterests" });
Interest.belongsTo(User, { foreignKey: "receiverId", as: "Receiver" });
