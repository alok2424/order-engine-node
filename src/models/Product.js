
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define("Product", {
  name: DataTypes.STRING,
  stock: DataTypes.INTEGER,
  price: DataTypes.FLOAT,
  version: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Product;