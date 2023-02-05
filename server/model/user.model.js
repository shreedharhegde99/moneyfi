const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    transactions: [{ type: Schema.Types.ObjectId, ref: Transactions }],
  },
  { versionKey: false, timestamps: { createdAt: true, updatedAt: true } }
);

const User = model("user", userSchema);
module.exports = User;
