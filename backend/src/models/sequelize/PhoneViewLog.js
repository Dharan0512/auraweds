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
exports.PhoneViewLog = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var PhoneViewLog = /** @class */ (function (_super) {
    __extends(PhoneViewLog, _super);
    function PhoneViewLog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PhoneViewLog;
}(sequelize_1.Model));
exports.PhoneViewLog = PhoneViewLog;
PhoneViewLog.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    viewerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    viewedUserId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    viewedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: db_postgres_1.sequelize,
    modelName: "PhoneViewLog",
    tableName: "phone_view_logs",
    timestamps: false,
});
