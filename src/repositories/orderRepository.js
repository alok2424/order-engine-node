// src/repositories/orderRepository.js
const { Order } = require("../models");

exports.findByIdempotencyKey = async (key) => {
  return Order.findOne({ where: { idempotencyKey: key } });
};

exports.create = async (data, transaction) => {
  return Order.create(data, { transaction });
};

exports.save = async (order, transaction) => {
  return order.save({ transaction });
};  