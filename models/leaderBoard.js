const mongoose = require("mongoose");

const leaderBoardSchema = new mongoose.Schema({
  name: String,
  time: Number,
  difficulty: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("LeaderBoard", leaderBoardSchema);
