import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";

interface MatchAttributes {
  id: number;
  userId1: number;
  userId2: number;
  compatibilityScore: number;
  createdAt?: Date;
}

interface MatchCreationAttributes extends Optional<
  MatchAttributes,
  "id" | "compatibilityScore"
> {}

export class Match
  extends Model<MatchAttributes, MatchCreationAttributes>
  implements MatchAttributes
{
  public id!: number;
  public userId1!: number;
  public userId2!: number;
  public compatibilityScore!: number;

  public readonly createdAt!: Date;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    userId2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    compatibilityScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "matches",
    timestamps: true,
    updatedAt: false, // matches only need createdAt in this design
    indexes: [
      {
        unique: true,
        fields: ["userId1", "userId2"],
        name: "unique_match",
      },
    ],
  },
);

User.hasMany(Match, { foreignKey: "userId1", as: "MatchesAsUser1" });
Match.belongsTo(User, { foreignKey: "userId1", as: "User1" });

User.hasMany(Match, { foreignKey: "userId2", as: "MatchesAsUser2" });
Match.belongsTo(User, { foreignKey: "userId2", as: "User2" });
