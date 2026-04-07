// src/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

router.post("/orders", controller.createOrder);

module.exports = router;