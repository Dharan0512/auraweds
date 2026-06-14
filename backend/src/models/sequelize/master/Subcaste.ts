import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";
import { Caste } from "./Caste";

interface SubcasteAttributes {
  id: number;
  casteId: number;
  name: string;
  isActive: boolean;
}

interface SubcasteCreationAttributes extends Optional<
  SubcasteAttributes,
  "id" | "isActive"
> {}

export class Subcaste
  extends Model<SubcasteAttributes, SubcasteCreationAttributes>
  implements SubcasteAttributes
{
  public id!: number;
  public casteId!: number;
  public name!: string;
  public isActive!: boolean;
}

Subcaste.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    casteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Caste,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "subcastes",
    timestamps: false,
  },
);

Caste.hasMany(Subcaste, { foreignKey: "casteId" });
Subcaste.belongsTo(Caste, { foreignKey: "casteId" });
