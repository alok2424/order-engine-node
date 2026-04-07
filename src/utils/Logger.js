// src/utils/logger.js
exports.log = (message) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};