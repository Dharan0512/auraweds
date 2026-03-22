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
exports.Match = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var User_1 = require("./User");
var Match = /** @class */ (function (_super) {
    __extends(Match, _super);
    function Match() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Match;
}(sequelize_1.Model));
exports.Match = Match;
Match.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId1: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: User_1.User, key: "id" },
        onDelete: "CASCADE",
    },
    userId2: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: User_1.User, key: "id" },
        onDelete: "CASCADE",
    },
    compatibilityScore: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "matches",
    timestamps: true,
    updatedAt: false, // matches only need createdAt in this design
    indexes: [
        {
            unique: true,
            fields: ["userId1", "userId2"],
            name: "unique_match",
        },
    ],
});
User_1.User.hasMany(Match, { foreignKey: "userId1", as: "MatchesAsUser1" });
Match.belongsTo(User_1.User, { foreignKey: "userId1", as: "User1" });
User_1.User.hasMany(Match, { foreignKey: "userId2", as: "MatchesAsUser2" });
Match.belongsTo(User_1.User, { foreignKey: "userId2", as: "User2" });
