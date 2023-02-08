const getUser = require("../controllers/getUserCategories");
const validateUser = require("../controllers/validateUser");

const dashboard = require("express").Router();

dashboard.use(validateUser);

dashboard.get("/", async (req, res) => {
	try {
		const { id } = req;

		let user = await getUser(id);
		return res.status(200).send({ ok: true, user });
	} catch (e) {
		console.log("ERROR IN FETCHING USER DETAILS", e.message);
	}
});

module.exports = dashboard;
