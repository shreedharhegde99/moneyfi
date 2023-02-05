const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
	{
		created_by: {
			type: String,
			default: "user",
		},
		type: {
			type: String,
			enum: ["income", "expense"],
		},
		name: {
			type: String,
			default: "others",
		},
	},
	{ versionKey: false, timestamps: { createdAt: true, updatedAt: true } }
);

const Category = model("category", categorySchema);

module.exports = Category;
