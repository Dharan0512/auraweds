import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";

interface WaitlistAttributes {
  id: number;
  userId: number;
  planName: string;
  email: string;
  createdAt?: Date;
}

interface WaitlistCreationAttributes extends Optional<
  WaitlistAttributes,
  "id"
> {}

export class Waitlist
  extends Model<WaitlistAttributes, WaitlistCreationAttributes>
  implements WaitlistAttributes
{
  public id!: number;
  public userId!: number;
  public planName!: string;
  public email!: string;

  public readonly createdAt!: Date;
}

Waitlist.init(
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
    planName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    tableName: "waitlists",
    timestamps: true,
    updatedAt: false,
  },
);

User.hasMany(Waitlist, { foreignKey: "userId" });
Waitlist.belongsTo(User, { foreignKey: "userId" });
