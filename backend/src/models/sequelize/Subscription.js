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
exports.Subscription = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var User_1 = require("./User");
var Plan_1 = require("./Plan");
var Subscription = /** @class */ (function (_super) {
    __extends(Subscription, _super);
    function Subscription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Subscription;
}(sequelize_1.Model));
exports.Subscription = Subscription;
Subscription.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: User_1.User, key: "id" },
        onDelete: "CASCADE",
    },
    planId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: Plan_1.Plan, key: "id" },
        onDelete: "CASCADE",
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "expired", "cancelled", "cancelled_pending"),
        defaultValue: "active",
    },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "subscriptions",
    timestamps: true,
    updatedAt: false,
});
User_1.User.hasMany(Subscription, { foreignKey: "userId" });
Subscription.belongsTo(User_1.User, { foreignKey: "userId" });
Plan_1.Plan.hasMany(Subscription, { foreignKey: "planId" });
Subscription.belongsTo(Plan_1.Plan, { foreignKey: "planId" });
