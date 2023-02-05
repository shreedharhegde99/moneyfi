const signup = require("express").Router();
const User = require("../model/user.model");
const argon = require("argon2");

signup.post("/", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			throw new Error("Missing required fields");
		}

		let existUser = await User.find({ email }).countDocuments();

		if (existUser) {
			throw new Error("User is already registered.");
		}
		let hash = await argon.hash(password);

		let newUser = await User.create({ name, email, password: hash });
		await newUser.save();
		return res
			.status(201)
			.send({ ok: true, message: "User signed up successfully" });
	} catch (e) {
		console.log("ERROR IN USER SIGNUP", e.message);
		return res.status(400).send({ ok: false, message: e.message });
	}
});

module.exports = signup;
