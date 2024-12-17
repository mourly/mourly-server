const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./UserModel");

const UserFriends = sequelize.define(
  "UserFriends",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    friend_id: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM("pending", "accept"),
      defaultValue: "pending",
    },
    mutual: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    viewing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tag: {
      type: DataTypes.ENUM("normal", "bff", "s&b", "family", "lover"),
      defaultValue: "normal",
    },
  },
  { tableName: "user_friends", timestamps: false, underscored: true }
);

// User ile ilişki
User.hasMany(UserFriends, { foreignKey: "user_id", as: "friends" });
UserFriends.belongsTo(User, { foreignKey: "user_id" });

module.exports = UserFriends;
