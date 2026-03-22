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
exports.UserProfile = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var User_1 = require("./User");
var MotherTongue_1 = require("./master/MotherTongue");
var Religion_1 = require("./master/Religion");
var Caste_1 = require("./master/Caste");
var Country_1 = require("./master/Country");
var State_1 = require("./master/State");
var City_1 = require("./master/City");
var Education_1 = require("./master/Education");
var EmploymentType_1 = require("./master/EmploymentType");
var Occupation_1 = require("./master/Occupation");
var Currency_1 = require("./master/Currency");
var IncomeRange_1 = require("./master/IncomeRange");
var UserProfile = /** @class */ (function (_super) {
    __extends(UserProfile, _super);
    function UserProfile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserProfile;
}(sequelize_1.Model));
exports.UserProfile = UserProfile;
UserProfile.init({
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
    dob: { type: sequelize_1.DataTypes.DATEONLY, allowNull: true },
    heightCm: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    physicalStatus: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: "Normal",
        validate: {
            isIn: [["Normal", "Physically Challenged"]],
        },
    },
    maritalStatus: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: "Never Married",
        validate: {
            isIn: [["Never Married", "Divorced", "Widowed", "Awaiting Divorce"]],
        },
    },
    childrenCount: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    childrenLivingWith: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    // Foreign Keys to Master Tables
    motherTongueId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: MotherTongue_1.MotherTongue, key: "id" },
        onDelete: "SET NULL",
    },
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
    subcaste: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    complexion: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    shortBio: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    convenientTimeToCall: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    linkedInUrl: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    instagramUrl: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    facebookUrl: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
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
    cityId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: City_1.City, key: "id" },
        onDelete: "SET NULL",
    },
    educationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: Education_1.Education, key: "id" },
        onDelete: "SET NULL",
    },
    employmentTypeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: EmploymentType_1.EmploymentType, key: "id" },
        onDelete: "SET NULL",
    },
    occupationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: Occupation_1.Occupation, key: "id" },
        onDelete: "SET NULL",
    },
    incomeRangeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: IncomeRange_1.IncomeRange, key: "id" },
        onDelete: "SET NULL",
    },
    familyStatus: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
        validate: {
            isIn: [["Middle Class", "Upper Middle Class", "Rich", "Affluent"]],
        },
    },
    incomeCurrencyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: Currency_1.Currency, key: "id" },
        onDelete: "SET NULL",
    },
    profileVisibility: {
        type: sequelize_1.DataTypes.STRING(50),
        defaultValue: "Public",
        validate: {
            isIn: [["Public", "Members Only", "Hidden"]],
        },
    },
    approvalStatus: {
        type: sequelize_1.DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
    },
    moderationReason: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    profileStrength: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    privacySettings: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: true,
        defaultValue: {
            showExactIncome: false,
            showFamilyDetails: true,
            showBirthDetails: true,
            showSocialLinks: true,
            showValues: true,
            showHoroscope: true,
            showAstroMatch: true,
        },
    },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "user_profiles",
    timestamps: true,
});
User_1.User.hasOne(UserProfile, { foreignKey: "userId" });
UserProfile.belongsTo(User_1.User, { foreignKey: "userId" });
// Define all associations to master tables down the line
UserProfile.belongsTo(MotherTongue_1.MotherTongue, { foreignKey: "motherTongueId" });
MotherTongue_1.MotherTongue.hasMany(UserProfile, { foreignKey: "motherTongueId" });
UserProfile.belongsTo(Religion_1.Religion, { foreignKey: "religionId" });
Religion_1.Religion.hasMany(UserProfile, { foreignKey: "religionId" });
UserProfile.belongsTo(Caste_1.Caste, { foreignKey: "casteId" });
Caste_1.Caste.hasMany(UserProfile, { foreignKey: "casteId" });
UserProfile.belongsTo(Country_1.Country, { foreignKey: "countryId" });
Country_1.Country.hasMany(UserProfile, { foreignKey: "countryId" });
UserProfile.belongsTo(State_1.State, { foreignKey: "stateId" });
State_1.State.hasMany(UserProfile, { foreignKey: "stateId" });
UserProfile.belongsTo(City_1.City, { foreignKey: "cityId" });
City_1.City.hasMany(UserProfile, { foreignKey: "cityId" });
UserProfile.belongsTo(Education_1.Education, { foreignKey: "educationId" });
Education_1.Education.hasMany(UserProfile, { foreignKey: "educationId" });
UserProfile.belongsTo(EmploymentType_1.EmploymentType, { foreignKey: "employmentTypeId" });
EmploymentType_1.EmploymentType.hasMany(UserProfile, { foreignKey: "employmentTypeId" });
UserProfile.belongsTo(Occupation_1.Occupation, { foreignKey: "occupationId" });
Occupation_1.Occupation.hasMany(UserProfile, { foreignKey: "occupationId" });
UserProfile.belongsTo(IncomeRange_1.IncomeRange, { foreignKey: "incomeRangeId" });
IncomeRange_1.IncomeRange.hasMany(UserProfile, { foreignKey: "incomeRangeId" });
UserProfile.belongsTo(Currency_1.Currency, { foreignKey: "incomeCurrencyId" });
Currency_1.Currency.hasMany(UserProfile, { foreignKey: "incomeCurrencyId" });
