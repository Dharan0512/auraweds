import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";

interface ProfileViewAttributes {
  id: number;
  viewerId: number;
  viewedId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProfileViewCreationAttributes extends Optional<
  ProfileViewAttributes,
  "id"
> {}

export class ProfileView
  extends Model<ProfileViewAttributes, ProfileViewCreationAttributes>
  implements ProfileViewAttributes
{
  public id!: number;
  public viewerId!: number;
  public viewedId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProfileView.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    viewerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    viewedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "profile_views",
    timestamps: true,
  },
);

User.hasMany(ProfileView, { foreignKey: "viewedId", as: "ProfileViews" });
ProfileView.belongsTo(User, { foreignKey: "viewerId", as: "Viewer" });
ProfileView.belongsTo(User, { foreignKey: "viewedId", as: "ViewedUser" });
