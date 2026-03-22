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
exports.Notification = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var User_1 = require("./User");
var Notification = /** @class */ (function (_super) {
    __extends(Notification, _super);
    function Notification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Notification;
}(sequelize_1.Model));
exports.Notification = Notification;
Notification.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
    },
    senderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onDelete: "SET NULL",
    },
    type: {
        type: sequelize_1.DataTypes.ENUM("CALL_ATTEMPT", "CONNECTION_WISH", "INTEREST_RECEIVED", "INTEREST_ACCEPTED", "PROFILE_VIEW", "ADMIN_BROADCAST", "MARKETING_OFFER"),
        allowNull: false,
    },
    message: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    isRead: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "notifications",
    timestamps: true,
});
User_1.User.hasMany(Notification, { foreignKey: "userId", as: "Notifications" });
Notification.belongsTo(User_1.User, { foreignKey: "userId" });
Notification.belongsTo(User_1.User, { foreignKey: "senderId", as: "Sender" });
