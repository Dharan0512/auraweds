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
exports.FamilyDetails = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var UserProfile_1 = require("./UserProfile");
var FamilyDetails = /** @class */ (function (_super) {
    __extends(FamilyDetails, _super);
    function FamilyDetails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FamilyDetails;
}(sequelize_1.Model));
exports.FamilyDetails = FamilyDetails;
FamilyDetails.init({
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
    fatherName: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    fatherOccupation: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    motherName: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    motherOccupation: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    familyType: {
        type: sequelize_1.DataTypes.ENUM("Joint", "Nuclear", "Other"),
        allowNull: true,
    },
    familyStatus: {
        type: sequelize_1.DataTypes.ENUM("Middle Class", "Upper Middle Class", "Rich", "Affluent"),
        allowNull: true,
    },
    siblingsCount: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    ownHouse: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: true },
    nativeDistrict: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    familyLocation: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "family_details",
    timestamps: true,
});
