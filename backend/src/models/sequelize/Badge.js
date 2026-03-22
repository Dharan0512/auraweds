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
exports.Badge = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var UserProfile_1 = require("./UserProfile");
var Badge = /** @class */ (function (_super) {
    __extends(Badge, _super);
    function Badge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Badge;
}(sequelize_1.Model));
exports.Badge = Badge;
Badge.init({
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
    mobileVerified: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    emailVerified: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    idVerified: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    adminApproved: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    premiumMember: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    horoscopeAvailable: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    highIntent: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "badges",
    timestamps: true,
});
