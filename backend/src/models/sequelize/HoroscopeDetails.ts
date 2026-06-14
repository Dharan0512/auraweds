import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { UserProfile } from "./UserProfile";
import { Star } from "./master/Star";
import { Rasi } from "./master/Rasi";
import { Laknam } from "./master/Laknam";
import { Gothram } from "./master/Gothram";
import { City } from "./master/City";

interface HoroscopeDetailsAttributes {
  id: number;
  userProfileId: number;
  star: string | null;
  starId: number | null;
  rasi: string | null;
  rasiId: number | null;
  laknam: string | null;
  laknamId: number | null;
  gothram: string | null;
  gothramId: number | null;
  sevvaiDhosham: "Yes" | "No" | "Don't Know" | null;
  rahuKetuDhosham: "Yes" | "No" | "Don't Know" | null;
  birthTime: string | null;
  birthPlace: string | null;
  birthCityId: number | null;
  horoscopePdfUrl: string | null;
  horoscopeImageUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HoroscopeDetailsCreationAttributes extends Optional<
  HoroscopeDetailsAttributes,
  | "id"
  | "star"
  | "starId"
  | "rasi"
  | "rasiId"
  | "laknam"
  | "laknamId"
  | "gothram"
  | "gothramId"
  | "sevvaiDhosham"
  | "rahuKetuDhosham"
  | "birthTime"
  | "birthPlace"
  | "birthCityId"
  | "horoscopePdfUrl"
  | "horoscopeImageUrl"
> {}

export class HoroscopeDetails
  extends Model<HoroscopeDetailsAttributes, HoroscopeDetailsCreationAttributes>
  implements HoroscopeDetailsAttributes
{
  public id!: number;
  public userProfileId!: number;
  public star!: string | null;
  public starId!: number | null;
  public rasi!: string | null;
  public rasiId!: number | null;
  public laknam!: string | null;
  public laknamId!: number | null;
  public gothram!: string | null;
  public gothramId!: number | null;
  public sevvaiDhosham!: "Yes" | "No" | "Don't Know" | null;
  public rahuKetuDhosham!: "Yes" | "No" | "Don't Know" | null;
  public birthTime!: string | null;
  public birthPlace!: string | null;
  public birthCityId!: number | null;
  public horoscopePdfUrl!: string | null;
  public horoscopeImageUrl!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

HoroscopeDetails.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: UserProfile, key: "id" },
      onDelete: "CASCADE",
    },
    star: { type: DataTypes.STRING(100), allowNull: true },
    starId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Star, key: "id" },
    },
    rasi: { type: DataTypes.STRING(100), allowNull: true },
    rasiId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Rasi, key: "id" },
    },
    laknam: { type: DataTypes.STRING(100), allowNull: true },
    laknamId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Laknam, key: "id" },
    },
    gothram: { type: DataTypes.STRING(100), allowNull: true },
    gothramId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Gothram, key: "id" },
    },
    sevvaiDhosham: {
      type: DataTypes.ENUM("Yes", "No", "Don't Know"),
      allowNull: true,
    },
    rahuKetuDhosham: {
      type: DataTypes.ENUM("Yes", "No", "Don't Know"),
      allowNull: true,
    },
    birthTime: { type: DataTypes.STRING(50), allowNull: true },
    birthPlace: { type: DataTypes.STRING(100), allowNull: true },
    birthCityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: City, key: "id" },
    },
    horoscopePdfUrl: { type: DataTypes.STRING(255), allowNull: true },
    horoscopeImageUrl: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    sequelize,
    tableName: "horoscope_details",
    timestamps: true,
  },
);

HoroscopeDetails.belongsTo(Star, { foreignKey: "starId", as: "Star" });
HoroscopeDetails.belongsTo(Rasi, { foreignKey: "rasiId", as: "Rasi" });
HoroscopeDetails.belongsTo(Laknam, { foreignKey: "laknamId", as: "Laknam" });
HoroscopeDetails.belongsTo(Gothram, { foreignKey: "gothramId", as: "Gothram" });
HoroscopeDetails.belongsTo(City, {
  foreignKey: "birthCityId",
  as: "BirthCity",
});
