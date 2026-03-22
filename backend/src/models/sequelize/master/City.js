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
exports.City = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../../config/db.postgres");
var State_1 = require("./State");
var City = /** @class */ (function (_super) {
    __extends(City, _super);
    function City() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return City;
}(sequelize_1.Model));
exports.City = City;
City.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    stateId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: State_1.State,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "cities",
    timestamps: false,
});
State_1.State.hasMany(City, { foreignKey: "stateId" });
City.belongsTo(State_1.State, { foreignKey: "stateId" });
