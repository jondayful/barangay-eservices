const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Request = sequelize.define(
  "Request",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    docType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    purpose: {
      type: DataTypes.TEXT,
    },
    pickup: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Request);
Request.belongsTo(User);

module.exports = Request;
