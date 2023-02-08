const User = require("../model/user.model");
async function getUserCategories(id) {
	try {
		let user = await User.findById(id)
			.select({ _id: 0, name: 1, categories: 1 })
			.populate("categories", ["_id", "type", "name"]);

		return user;
	} catch (e) {
		console.log("ERROR IN FETCHING", e.message);
		throw new Error(e.message);
	}
}

module.exports = getUserCategories;
