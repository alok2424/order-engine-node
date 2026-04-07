// src/repositories/productRepository.js
const { Product } = require("../models");

exports.findByIdForUpdate = async (id, transaction) => {
  return Product.findByPk(id, {
    transaction,
    lock: transaction.LOCK.UPDATE
  });
};

exports.save = async (product, transaction) => {
  return product.save({ transaction });
};