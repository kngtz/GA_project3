const mongoose = require("mongoose");

const gameroomSchema = new mongoose.Schema({
  name: String,
  players: Array
});

const Gameroom = mongoose.model("Gameroom", gameroomSchema);

module.exports = Gameroom;
