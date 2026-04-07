// server.js
const express = require("express");
const app = express();

const { sequelize } = require("./src/models");
const orderRoutes = require("./src/routes/orderRoutes");

app.use(express.json());
app.use(orderRoutes);

sequelize.sync().then(() => {
  console.log("DB Connected");
  app.listen(3000, () => console.log("Server running on port 3000"));
});