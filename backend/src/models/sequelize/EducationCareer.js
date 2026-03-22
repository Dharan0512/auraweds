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
exports.EducationCareer = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var UserProfile_1 = require("./UserProfile");
var EducationCareer = /** @class */ (function (_super) {
    __extends(EducationCareer, _super);
    function EducationCareer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EducationCareer;
}(sequelize_1.Model));
exports.EducationCareer = EducationCareer;
EducationCareer.init({
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
    highestEducation: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    fieldOfStudy: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    college: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    employmentType: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    companyName: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    designation: { type: sequelize_1.DataTypes.STRING(150), allowNull: true },
    incomeRange: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    exactIncome: { type: sequelize_1.DataTypes.BIGINT, allowNull: true },
    assets: { type: sequelize_1.DataTypes.JSONB, allowNull: true },
    careerPlanAfterMarriage: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "education_career",
    timestamps: true,
});
