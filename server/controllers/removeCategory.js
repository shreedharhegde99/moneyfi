const Category = require("../model/category.model");
const User = require("../model/user.model");

async function removeCategory(id, userId) {
	try {
		let userCategory = await Category.findById(id);

		if (userCategory?.created_by === "user") {
			await Category.findByIdAndDelete(id);
		}

		await User.findByIdAndUpdate(userId, {
			$pull: { categories: id },
		});
		return;
	} catch (e) {
		console.log("ERROR IN REMOVING CATEGORY", e.message);
		throw new Error(e.message);
	}
}

module.exports = removeCategory;
