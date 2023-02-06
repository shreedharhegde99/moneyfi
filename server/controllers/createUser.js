const User = require("../model/user.model");
const argon = require("argon2");
const getDefaultCategories = require("./defaultCategories");

async function createUser(name, email, password) {
	try {
		const hash = await argon.hash(password);
		const categories = await getDefaultCategories();
		let newUser = await User.create({
			name,
			email,
			password: hash,
			categories,
		});
		await newUser.save();
	} catch (e) {
		console.log("ERROR IN CREATING USER", e.message);
		throw Error(e.message);
	}
}

module.exports = createUser;
