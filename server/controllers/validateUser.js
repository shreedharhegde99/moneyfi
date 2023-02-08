const jwt = require("jsonwebtoken");
require("dotenv").config();

function validateUser(req, res, next) {
	try {
		const token = req.headers["authorization"];
		let timeNow = parseInt(Date.now() / 1000);
		if (!token) {
			return res.status(401).send({ ok: false, message: "Missing token" });
		}
		let { id, exp } = jwt.decode(token, process.env.TOKEN_SECRET);

		if (exp < timeNow) {
			return res.status(401).send({ ok: false, message: "Token is expired" });
		}

		req.id = id;
		next();
	} catch (e) {
		console.log("ERROR IN FETCHING", e.message);
		throw new Error(e.message);
	}
}
module.exports = validateUser;
