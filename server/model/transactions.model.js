const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
	{
		type: {
			type: String,
			enum: ["income", "expense"],
		},
		category: String,
		date: { type: Number, required: true },
		amount: { type: Number, required: true },
	},
	{ versionKey: false, timestamps: { createdAt: true, updatedAt: true } }
);

const Transactions = model("transaction", transactionSchema);

module.exports = Transactions;
