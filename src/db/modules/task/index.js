const mongoose = require("mongoose");

const { Schema } = mongoose;
const oneBuy = new Schema({
  shop: String,
  date: String,
  sum: Number,
});

module.exports = Buys = mongoose.model("buy", oneBuy);