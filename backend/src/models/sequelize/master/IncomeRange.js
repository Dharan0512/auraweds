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
exports.IncomeRange = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../../config/db.postgres");
var Currency_1 = require("./Currency");
var IncomeRange = /** @class */ (function (_super) {
    __extends(IncomeRange, _super);
    function IncomeRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IncomeRange;
}(sequelize_1.Model));
exports.IncomeRange = IncomeRange;
IncomeRange.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    currencyId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Currency_1.Currency,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    minValue: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    maxValue: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    displayLabel: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    sortOrder: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "income_ranges",
    timestamps: false,
});
Currency_1.Currency.hasMany(IncomeRange, { foreignKey: "currencyId" });
IncomeRange.belongsTo(Currency_1.Currency, { foreignKey: "currencyId" });
