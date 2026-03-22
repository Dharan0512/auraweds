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
exports.UserPhoto = void 0;
var sequelize_1 = require("sequelize");
var db_postgres_1 = require("../../config/db.postgres");
var User_1 = require("./User");
var UserPhoto = /** @class */ (function (_super) {
    __extends(UserPhoto, _super);
    function UserPhoto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserPhoto;
}(sequelize_1.Model));
exports.UserPhoto = UserPhoto;
UserPhoto.init({
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
    url: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    isMain: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    order: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    approvalStatus: {
        type: sequelize_1.DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
    },
}, {
    sequelize: db_postgres_1.sequelize,
    tableName: "user_photos",
    timestamps: true,
});
User_1.User.hasMany(UserPhoto, { foreignKey: "userId", as: "photos" });
UserPhoto.belongsTo(User_1.User, { foreignKey: "userId" });
