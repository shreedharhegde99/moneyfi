const Category = require("../model/category.model");

async function getDefaultCategories() {
	try {
		let categories = await Category.find({ created_by: "admin" });
		return categories;
	} catch (e) {
		console.log("ERROR IN FETCHING DEFAULT CATEGORIES", e.message);
		return new Error(e.message);
	}
}

module.exports = getDefaultCategories;
