const addNewCategory = require("../controllers/addNewCategory");
const getUserCategories = require("../controllers/getUserCategories");
const removeCategory = require("../controllers/removeCategory");
const validateUser = require("../controllers/validateUser");

const categoryRoute = require("express").Router();

categoryRoute.use(validateUser);

categoryRoute.get("/", async (req, res) => {
	try {
		const { id } = req;

		let user = await getUserCategories(id);
		return res.status(200).send({ ok: true, user });
	} catch (e) {
		console.log("ERROR IN FETCHING CATEGORY LIST", e.message);
	}
});

categoryRoute.post("/", async (req, res) => {
	try {
		await addNewCategory(req.body, req.id);
		res.status(201).send({ ok: true, message: "Category added successfully" });
	} catch (e) {
		console.log("ERROR IN CATEGORY POST METHOD", e.message);
		return res.status(500).send({ ok: false, message: e.message });
	}
});

categoryRoute.delete("/:categoryId", async (req, res) => {
	try {
		const { categoryId } = req.params;
		await removeCategory(categoryId, req.id);
		res
			.status(200)
			.send({ ok: true, message: "Category removed successfully" });
	} catch (e) {
		console.log("ERROR IN CATEGORY DELETE METHOD", e.message);
		return res.status(500).send({ ok: false, message: e.message });
	}
});

module.exports = categoryRoute;
