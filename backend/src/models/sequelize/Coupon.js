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
exports.Coupon = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var Coupon = /** @class */ (function (_super) {
    __extends(Coupon, _super);
    function Coupon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Coupon;
}(sequelize_1.Model));
exports.Coupon = Coupon;
Coupon.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    discountType: {
        type: sequelize_1.DataTypes.ENUM("percentage", "fixed"),
        allowNull: false,
    },
    discountValue: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    expiryDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    maxUsage: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    currentUsage: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "coupons",
    timestamps: true,
});
