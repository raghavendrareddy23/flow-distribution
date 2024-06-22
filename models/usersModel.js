const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  astrologerId: { type: mongoose.Schema.Types.ObjectId, ref: "Astrologer" },
});


module.exports = mongoose.model("Users1", userSchema);
