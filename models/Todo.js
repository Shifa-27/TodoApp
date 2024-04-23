const mongoose = require("mongoose");
const session = require('express-session')


const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = new mongoose.model("Todo", TodoSchema);
