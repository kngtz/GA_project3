const mongoose = require("mongoose");

const answersSchema = new mongoose.Schema({
  description: String
});

const Answers = mongoose.model("Answers", answersSchema);

module.exports = Answers;
