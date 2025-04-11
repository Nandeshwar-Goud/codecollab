const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  sessionCode: { type: String, required: true, unique: true },
  content: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now, expires: 86400 } // expires in 24 hrs
});

module.exports = mongoose.model("Session", SessionSchema);
