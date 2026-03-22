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
exports.Waitlist = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var User_1 = require("./User");
var Waitlist = /** @class */ (function (_super) {
    __extends(Waitlist, _super);
    function Waitlist() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Waitlist;
}(sequelize_1.Model));
exports.Waitlist = Waitlist;
Waitlist.init({
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
    planName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "waitlists",
    timestamps: true,
    updatedAt: false,
});
User_1.User.hasMany(Waitlist, { foreignKey: "userId" });
Waitlist.belongsTo(User_1.User, { foreignKey: "userId" });
