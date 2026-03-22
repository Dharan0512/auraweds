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
exports.Education = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../../config/db.postgres");
var Education = /** @class */ (function (_super) {
    __extends(Education, _super);
    function Education() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Education;
}(sequelize_1.Model));
exports.Education = Education;
Education.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    level: {
        type: sequelize_1.DataTypes.ENUM("School", "UG", "PG", "Doctorate"),
        allowNull: false,
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
    tableName: "educations",
    timestamps: false,
});
