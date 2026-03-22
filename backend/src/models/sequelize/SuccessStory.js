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
exports.SuccessStory = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var User_1 = require("./User");
var SuccessStory = /** @class */ (function (_super) {
    __extends(SuccessStory, _super);
    function SuccessStory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SuccessStory;
}(sequelize_1.Model));
exports.SuccessStory = SuccessStory;
SuccessStory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    partner1Id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: User_1.User, key: "id" },
    },
    partner2Id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: User_1.User, key: "id" },
    },
    status: { type: sequelize_1.DataTypes.ENUM("engagement", "married"), allowNull: false },
    storyText: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    weddingDate: { type: sequelize_1.DataTypes.DATEONLY, allowNull: true },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "success_stories",
    timestamps: true,
});
