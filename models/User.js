const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    snippets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Snippet" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
