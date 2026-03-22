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
exports.UserPreference = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var User_1 = require("./User");
var Religion_1 = require("./master/Religion");
var Caste_1 = require("./master/Caste");
var Country_1 = require("./master/Country");
var State_1 = require("./master/State");
var Education_1 = require("./master/Education");
var UserPreference = /** @class */ (function (_super) {
    __extends(UserPreference, _super);
    function UserPreference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserPreference;
}(sequelize_1.Model));
exports.UserPreference = UserPreference;
UserPreference.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: User_1.User, key: "id" },
        onDelete: "CASCADE",
    },
    minAge: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 18 },
    maxAge: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 40 },
    minHeightCm: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    maxHeightCm: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    maritalStatus: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    religionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: Religion_1.Religion, key: "id" },
        onDelete: "SET NULL",
    },
    casteId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: Caste_1.Caste, key: "id" },
        onDelete: "SET NULL",
    },
    educationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: Education_1.Education, key: "id" },
        onDelete: "SET NULL",
    },
    countryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: Country_1.Country, key: "id" },
        onDelete: "SET NULL",
    },
    stateId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: State_1.State, key: "id" },
        onDelete: "SET NULL",
    },
    preferredLocation: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    preferredEducation: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    preferredIncomeRange: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    mustHave: { type: sequelize_1.DataTypes.JSONB, allowNull: true },
    dealBreakers: { type: sequelize_1.DataTypes.JSONB, allowNull: true },
    partnerCastes: { type: sequelize_1.DataTypes.JSONB, allowNull: true },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "user_preferences",
    timestamps: true,
});
User_1.User.hasOne(UserPreference, { foreignKey: "userId" });
UserPreference.belongsTo(User_1.User, { foreignKey: "userId" });
UserPreference.belongsTo(Religion_1.Religion, { foreignKey: "religionId" });
Religion_1.Religion.hasMany(UserPreference, { foreignKey: "religionId" });
UserPreference.belongsTo(Caste_1.Caste, { foreignKey: "casteId" });
Caste_1.Caste.hasMany(UserPreference, { foreignKey: "casteId" });
UserPreference.belongsTo(Education_1.Education, { foreignKey: "educationId" });
Education_1.Education.hasMany(UserPreference, { foreignKey: "educationId" });
UserPreference.belongsTo(Country_1.Country, { foreignKey: "countryId" });
Country_1.Country.hasMany(UserPreference, { foreignKey: "countryId" });
UserPreference.belongsTo(State_1.State, { foreignKey: "stateId" });
State_1.State.hasMany(UserPreference, { foreignKey: "stateId" });
