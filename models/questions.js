const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  description: String
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
