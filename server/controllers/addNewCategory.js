const Category = require("../model/category.model");
const User = require("../model/user.model");

async function addNewCategory({ type, name }, userId) {
	try {
		let newCategory = await Category.create({ type, name });
		await newCategory.save();
		await User.findByIdAndUpdate(userId, {
			$push: { categories: newCategory._id },
		});
	} catch (e) {
		console.log("ERROR IN CREATING CATEGORY", e.message);
		throw new Error(e.message);
	}
}

module.exports = addNewCategory;
