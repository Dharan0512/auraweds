import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";

interface CouponAttributes {
  id: number;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiryDate: Date | null;
  maxUsage: number | null;
  currentUsage: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CouponCreationAttributes extends Optional<
  CouponAttributes,
  "id" | "expiryDate" | "maxUsage" | "currentUsage" | "isActive"
> {}

export class Coupon
  extends Model<CouponAttributes, CouponCreationAttributes>
  implements CouponAttributes
{
  public id!: number;
  public code!: string;
  public discountType!: "percentage" | "fixed";
  public discountValue!: number;
  public expiryDate!: Date | null;
  public maxUsage!: number | null;
  public currentUsage!: number;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Coupon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    discountType: {
      type: DataTypes.ENUM("percentage", "fixed"),
      allowNull: false,
    },
    discountValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    maxUsage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    currentUsage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "coupons",
    timestamps: true,
  },
);
