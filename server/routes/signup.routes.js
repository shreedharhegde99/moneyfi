const signup = require("express").Router();
const User = require("../model/user.model");
const createUser = require("../controllers/createUser");
const validateSignup = require("../middlewares/signup.middlewares");

signup.use(validateSignup);
signup.post("/", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		let existUser = await User.find({ email }).countDocuments();
		if (existUser) {
			throw new Error("User is already registered.");
		}
		await createUser(name, email, password);

		return res
			.status(201)
			.send({ ok: true, message: "User signed up successfully" });
	} catch (e) {
		console.log("ERROR IN USER SIGNUP", e.message);
		return res.status(400).send({ ok: false, message: e.message });
	}
});

module.exports = signup;
