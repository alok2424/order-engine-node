
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  userId: DataTypes.INTEGER,
  status: DataTypes.STRING,
  idempotencyKey: {
    type: DataTypes.STRING,
    unique: true
  }
});

module.exports = Order;