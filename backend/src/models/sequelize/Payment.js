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
exports.Payment = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var User_1 = require("./User");
var Subscription_1 = require("./Subscription");
var Payment = /** @class */ (function (_super) {
    __extends(Payment, _super);
    function Payment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Payment;
}(sequelize_1.Model));
exports.Payment = Payment;
Payment.init({
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
    subscriptionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: Subscription_1.Subscription, key: "id" },
        onDelete: "CASCADE",
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    currency: {
        type: sequelize_1.DataTypes.STRING(10),
        defaultValue: "INR",
    },
    paymentStatus: {
        type: sequelize_1.DataTypes.ENUM("pending", "success", "failed"),
        defaultValue: "pending",
    },
    providerTransactionId: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "payments",
    timestamps: true,
    updatedAt: false,
});
User_1.User.hasMany(Payment, { foreignKey: "userId" });
Payment.belongsTo(User_1.User, { foreignKey: "userId" });
Subscription_1.Subscription.hasMany(Payment, { foreignKey: "subscriptionId" });
Payment.belongsTo(Subscription_1.Subscription, { foreignKey: "subscriptionId" });
