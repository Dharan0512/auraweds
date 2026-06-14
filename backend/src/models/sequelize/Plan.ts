import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";

interface PlanAttributes {
  id: number;
  name: string;
  monthlyPrice: number;
  features: object | null;
  isActive: boolean;
  createdAt?: Date;
}

interface PlanCreationAttributes extends Optional<
  PlanAttributes,
  "id" | "features" | "isActive"
> {}

export class Plan
  extends Model<PlanAttributes, PlanCreationAttributes>
  implements PlanAttributes
{
  public id!: number;
  public name!: string;
  public monthlyPrice!: number;
  public features!: object | null;
  public isActive!: boolean;

  public readonly createdAt!: Date;
}

Plan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    monthlyPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    features: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "plans",
    timestamps: true,
    updatedAt: false,
  },
);
