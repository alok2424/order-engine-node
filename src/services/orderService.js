
const { sequelize, Product, Order, OrderItem } = require("../models");

exports.createOrder = async (data) => {
  const { userId, items, idempotencyKey } = data;

  // Idempotency check
  const existing = await Order.findOne({ where: { idempotencyKey } });
  if (existing) return existing;

  const t = await sequelize.transaction();

  try {
    const order = await Order.create(
      { userId, status: "INIT", idempotencyKey },
      { transaction: t }
    );

    // PROCESSING
    order.status = "PROCESSING";
    await order.save({ transaction: t });

    for (const item of items) {
      const product = await Product.findByPk(item.productId, {
        transaction: t,
        lock: t.LOCK.UPDATE // pessimistic locking
      });

      if (!product || product.stock < item.quantity) {
        throw new Error("Out of stock");
      }

      product.stock -= item.quantity;
      product.version += 1;

      await product.save({ transaction: t });

      await OrderItem.create(
        {
          productId: item.productId,
          quantity: item.quantity,
          OrderId: order.id
        },
        { transaction: t }
      );
    }

    // Payment Simulation
    const paymentSuccess = Math.random() > 0.5;

    if (!paymentSuccess) {
      throw new Error("Payment Failed");
    }

    order.status = "SUCCESS";
    await order.save({ transaction: t });

    await t.commit();
    return order;

  } catch (err) {
    await t.rollback();
    throw err;
  }
};