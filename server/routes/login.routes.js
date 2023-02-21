const generateToken = require("../controllers/generateToken");
const loginUser = require("../controllers/loginUser");
const loginValidator = require("../middlewares/login.middlewares");
const login = require("express").Router();

login.use(loginValidator);

login.post("/", async (req, res) => {
	try {
		const { email, password } = req.body;
		let id = await loginUser(email, password);
		const token = generateToken(id);
		return res
			.status(200)
			.send({ ok: true, message: "Login successful", token });
	} catch (e) {
		console.log("ERROR IN LOGIN ROUTE", e.message);
		res.status(400).send({ ok: false, message: e.message });
	}
});

module.exports = login;
