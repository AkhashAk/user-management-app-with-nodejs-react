const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "Please enter a first name"],
    },
    lastName: {
      type: String,
    },
    emailID: {
      type: String,
      required: [true, "Please enter a emailID"],
    },
    checked: {
      type: Boolean,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;