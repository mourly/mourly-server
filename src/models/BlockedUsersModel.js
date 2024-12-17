const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./UserModel");

const BlockedUsers = sequelize.define(
  "BlockedUsers",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    blocked_user_id: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    reason: {
      type: DataTypes.TEXT,
      defaultValue: "no reason",
    },
  },
  { tableName: "blocked_users", timestamps: false, underscored: true }
);

// User ile ilişki
User.hasMany(BlockedUsers, { foreignKey: "user_id", as: "blocked_users" });
BlockedUsers.belongsTo(User, { foreignKey: "user_id" });

module.exports = BlockedUsers;
