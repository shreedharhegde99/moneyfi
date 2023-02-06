const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(id) {
	try {
		const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
			expiresIn: "7d",
		});
		return token;
	} catch (e) {
		console.log("ERROR IN GENERATING TOKEN", e.message);
		throw new Error(e.message);
	}
}

module.exports = generateToken;
