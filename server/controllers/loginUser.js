const argon = require("argon2");
const User = require("../model/user.model");

async function loginUser(email, password) {
	try {
		let existUser = await User.findOne({ email });
		if (!existUser) {
			throw new Error("User is not registered");
		}
		const verified = await argon.verify(existUser.password, password);

		if (!verified) {
			throw new Error("Wrong credentials");
		}

		return existUser._id;
	} catch (e) {
		console.log("ERROR IN LOGGING IN USER", e.message);
		throw new Error(e.message);
	}
}

module.exports = loginUser;
