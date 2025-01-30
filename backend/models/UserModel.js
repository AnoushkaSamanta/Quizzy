const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  points: {
    type: Number,
    default: 0, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
