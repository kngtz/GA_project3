const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
  description: String
});

const Questions = mongoose.model("Questions", questionSchema);

module.exports = Questions;
