
const sequelize = require("../config/db");

const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

module.exports = {
  sequelize,
  Product,
  Order,
  OrderItem
};