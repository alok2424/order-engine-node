
const orderService = require("../services/orderService");

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};