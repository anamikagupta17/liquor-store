const mongoose = require("../config/db");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },

    status: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
