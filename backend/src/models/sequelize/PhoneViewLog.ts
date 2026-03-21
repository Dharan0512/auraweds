import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db.postgres";

export class PhoneViewLog extends Model {
  public id!: number;
  public viewerId!: number;
  public viewedUserId!: number;
  public readonly viewedAt!: Date;
}

PhoneViewLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    viewerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    viewedUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    viewedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "PhoneViewLog",
    tableName: "phone_view_logs",
    timestamps: false,
  },
);
