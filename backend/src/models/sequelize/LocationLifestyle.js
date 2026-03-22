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
exports.LocationLifestyle = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var UserProfile_1 = require("./UserProfile");
var LocationLifestyle = /** @class */ (function (_super) {
    __extends(LocationLifestyle, _super);
    function LocationLifestyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LocationLifestyle;
}(sequelize_1.Model));
exports.LocationLifestyle = LocationLifestyle;
LocationLifestyle.init({
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
    country: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    state: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    city: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    relocatePreference: {
        type: sequelize_1.DataTypes.ENUM("Yes", "No", "Flexible"),
        allowNull: true,
    },
    diet: {
        type: sequelize_1.DataTypes.ENUM("Veg", "Non-veg", "Eggetarian", "Vegan"),
        allowNull: true,
    },
    drink: {
        type: sequelize_1.DataTypes.ENUM("Yes", "No", "Occasionally"),
        allowNull: true,
    },
    smoke: {
        type: sequelize_1.DataTypes.ENUM("Yes", "No", "Occasionally"),
        allowNull: true,
    },
    fitnessLevel: {
        type: sequelize_1.DataTypes.ENUM("Regular", "Occasional", "Not at all"),
        allowNull: true,
    },
    ambition: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    familyOrientation: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    emotionalStability: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    communicationStyle: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    spiritualInclination: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    languages: { type: sequelize_1.DataTypes.JSONB, allowNull: true },
    hobbies: { type: sequelize_1.DataTypes.JSONB, allowNull: true },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "location_lifestyle",
    timestamps: true,
});
