const mongoose = require("mongoose");

const targetSchema = new mongoose.Schema({
  difficulty: String,
  targetName: String,
  x: { type: Number, min: 0, max: 100 },
  y: { type: Number, min: 0, max: 100 },
});

module.exports = mongoose.model("Target", targetSchema);
