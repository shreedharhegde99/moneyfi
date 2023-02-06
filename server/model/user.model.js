const { Schema, model } = require("mongoose");
const Category = require("./category.model");
const Transactions = require("./transactions.model");

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
		categories: [{ type: Schema.Types.ObjectId, ref: Category }],
	},
	{ versionKey: false, timestamps: { createdAt: true, updatedAt: true } }
);

const User = model("user", userSchema);
module.exports = User;
