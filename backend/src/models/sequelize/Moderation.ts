import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";

interface BlockAttributes {
  id: number;
  blockerId: number;
  blockedId: number;
}

interface BlockCreationAttributes extends Optional<BlockAttributes, "id"> {}

export class Block
  extends Model<BlockAttributes, BlockCreationAttributes>
  implements BlockAttributes
{
  public id!: number;
  public blockerId!: number;
  public blockedId!: number;
}

Block.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    blockerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    blockedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
  },
  {
    sequelize,
    tableName: "blocks",
    timestamps: true,
  },
);

interface ReportAttributes {
  id: number;
  reporterId: number;
  reportedId: number;
  reason: string;
}

interface ReportCreationAttributes extends Optional<ReportAttributes, "id"> {}

export class Report
  extends Model<ReportAttributes, ReportCreationAttributes>
  implements ReportAttributes
{
  public id!: number;
  public reporterId!: number;
  public reportedId!: number;
  public reason!: string;
}

Report.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reporterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    reportedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    reason: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    tableName: "reports",
    timestamps: true,
  },
);

User.hasMany(Report, { foreignKey: "reporterId", as: "SubmittedReports" });
Report.belongsTo(User, { foreignKey: "reporterId", as: "Reporter" });

User.hasMany(Report, { foreignKey: "reportedId", as: "ReceivedReports" });
Report.belongsTo(User, { foreignKey: "reportedId", as: "Reported" });
