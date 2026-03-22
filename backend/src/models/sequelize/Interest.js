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
exports.Interest = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var User_1 = require("./User");
var Interest = /** @class */ (function (_super) {
    __extends(Interest, _super);
    function Interest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Interest;
}(sequelize_1.Model));
exports.Interest = Interest;
Interest.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    senderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
    },
    receiverId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("PENDING", "ACCEPTED", "DECLINED", "WITHDRAWN", "EXPIRED", "BLOCKED"),
        defaultValue: "PENDING",
    },
    viewedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "interests",
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["senderId", "receiverId"],
            where: {
                status: "PENDING",
            },
            name: "unique_pending_interest",
        },
        {
            fields: ["senderId", "status", "createdAt"],
            name: "idx_interests_sender_status",
        },
        {
            fields: ["receiverId", "status", "createdAt"],
            name: "idx_interests_receiver_status",
        },
        {
            fields: ["status"],
            name: "idx_interests_status",
        },
    ],
});
User_1.User.hasMany(Interest, { foreignKey: "senderId", as: "SentInterests" });
Interest.belongsTo(User_1.User, { foreignKey: "senderId", as: "Sender" });
User_1.User.hasMany(Interest, { foreignKey: "receiverId", as: "ReceivedInterests" });
Interest.belongsTo(User_1.User, { foreignKey: "receiverId", as: "Receiver" });
