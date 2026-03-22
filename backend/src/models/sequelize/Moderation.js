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
exports.Report = exports.Block = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var User_1 = require("./User");
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Block;
}(sequelize_1.Model));
exports.Block = Block;
Block.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    blockerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: User_1.User, key: "id" },
    },
    blockedId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: User_1.User, key: "id" },
    },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "blocks",
    timestamps: true,
});
var Report = /** @class */ (function (_super) {
    __extends(Report, _super);
    function Report() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Report;
}(sequelize_1.Model));
exports.Report = Report;
Report.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    reporterId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: User_1.User, key: "id" },
    },
    reportedId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: User_1.User, key: "id" },
    },
    reason: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "reports",
    timestamps: true,
});
User_1.User.hasMany(Report, { foreignKey: "reporterId", as: "SubmittedReports" });
Report.belongsTo(User_1.User, { foreignKey: "reporterId", as: "Reporter" });
User_1.User.hasMany(Report, { foreignKey: "reportedId", as: "ReceivedReports" });
Report.belongsTo(User_1.User, { foreignKey: "reportedId", as: "Reported" });
