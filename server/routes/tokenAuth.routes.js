const tokenAuthRoute = require("express").Router();
const validateUser = require("../controllers/validateUser");

tokenAuthRoute.use(validateUser);
tokenAuthRoute.get("/", async (req, res) => {
	try {
		return res.status(200).send({ ok: true });
	} catch (e) {
		console.log("ERROR IN FETCHING", e.message);
		return res.status(500).send({ ok: false, message: e.message });
	}
});

module.exports = tokenAuthRoute;
