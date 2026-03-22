import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";

interface MessageAttributes {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  isRead: boolean;
  deletedAt: Date | null;
  createdAt?: Date;
}

interface MessageCreationAttributes extends Optional<
  MessageAttributes,
  "id" | "isRead" | "deletedAt"
> {}

export class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public content!: string;
  public isRead!: boolean;
  public deletedAt!: Date | null;

  public readonly createdAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "messages",
    timestamps: true,
    updatedAt: false, // only createdAt needed for simple messaging log alongside deletedAt
    paranoid: true, // soft delete support
    indexes: [
      {
        fields: ["senderId", "receiverId"],
        name: "idx_messages_conversation",
      },
    ],
  },
);

User.hasMany(Message, { foreignKey: "senderId", as: "SentMessages" });
Message.belongsTo(User, { foreignKey: "senderId", as: "MessageSender" });

User.hasMany(Message, { foreignKey: "receiverId", as: "ReceivedMessages" });
Message.belongsTo(User, { foreignKey: "receiverId", as: "MessageReceiver" });
