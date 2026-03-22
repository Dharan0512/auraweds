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
exports.ProfileView = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var User_1 = require("./User");
var ProfileView = /** @class */ (function (_super) {
    __extends(ProfileView, _super);
    function ProfileView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ProfileView;
}(sequelize_1.Model));
exports.ProfileView = ProfileView;
ProfileView.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    viewerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
    },
    viewedId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
    },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "profile_views",
    timestamps: true,
});
User_1.User.hasMany(ProfileView, { foreignKey: "viewedId", as: "ProfileViews" });
ProfileView.belongsTo(User_1.User, { foreignKey: "viewerId", as: "Viewer" });
ProfileView.belongsTo(User_1.User, { foreignKey: "viewedId", as: "ViewedUser" });
