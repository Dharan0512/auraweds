"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoroscopeDetails = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var UserProfile_1 = require("./UserProfile");
var Star_1 = require("./master/Star");
var Rasi_1 = require("./master/Rasi");
var Laknam_1 = require("./master/Laknam");
var Gothram_1 = require("./master/Gothram");
var City_1 = require("./master/City");
var HoroscopeDetails = /** @class */ (function (_super) {
    __extends(HoroscopeDetails, _super);
    function HoroscopeDetails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HoroscopeDetails;
}(sequelize_1.Model));
exports.HoroscopeDetails = HoroscopeDetails;
HoroscopeDetails.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userProfileId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: UserProfile_1.UserProfile, key: "id" },
        onDelete: "CASCADE",
    },
    star: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    starId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: Star_1.Star, key: "id" },
    },
    rasi: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    rasiId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: Rasi_1.Rasi, key: "id" },
    },
    laknam: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    laknamId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: Laknam_1.Laknam, key: "id" },
    },
    gothram: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    gothramId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: Gothram_1.Gothram, key: "id" },
    },
    sevvaiDhosham: {
        type: sequelize_1.DataTypes.ENUM("Yes", "No", "Don't Know"),
        allowNull: true,
    },
    rahuKetuDhosham: {
        type: sequelize_1.DataTypes.ENUM("Yes", "No", "Don't Know"),
        allowNull: true,
    },
    birthTime: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    birthPlace: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    birthCityId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: City_1.City, key: "id" },
    },
    horoscopePdfUrl: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    horoscopeImageUrl: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "horoscope_details",
    timestamps: true,
});
HoroscopeDetails.belongsTo(Star_1.Star, { foreignKey: "starId", as: "Star" });
HoroscopeDetails.belongsTo(Rasi_1.Rasi, { foreignKey: "rasiId", as: "Rasi" });
HoroscopeDetails.belongsTo(Laknam_1.Laknam, { foreignKey: "laknamId", as: "Laknam" });
HoroscopeDetails.belongsTo(Gothram_1.Gothram, { foreignKey: "gothramId", as: "Gothram" });
HoroscopeDetails.belongsTo(City_1.City, {
    foreignKey: "birthCityId",
    as: "BirthCity",
});
