
const { OrderItem } = require("../models");

exports.create = async (data, transaction) => {
  return OrderItem.create(data, { transaction });
};