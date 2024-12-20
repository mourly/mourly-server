const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING(11),
      primaryKey: true,
      allowNull: false,
      validate: {
        len: [11, 11],
        isNumeric: true,
      },
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [8, 64],
      },
    },
    avatar: {
      type: DataTypes.STRING(255),
      defaultValue: "default_avatar",
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    account_status: {
      type: DataTypes.ENUM(
        "active",
        "pending",
        "suspend",
        "banned",
        "deactivated",
        "deleted"
      ),
      defaultValue: "pending",
    },
    banner: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 12);
      },
    },
  }
);

module.exports = User;
