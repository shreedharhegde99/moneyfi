const transactionRoute = require("express").Router();
const addNewTransaction = require("../controllers/addNewTransaction");
const getTransactionData = require("../controllers/getTransactionData");
const removeTransaction = require("../controllers/removeTransaction");
const updateTransaction = require("../controllers/updateTransaction");
const validateUser = require("../controllers/validateUser");

transactionRoute.use(validateUser);

transactionRoute.get("/", async (req, res) => {
	try {
		const { id } = req;
		const transctionsData = await getTransactionData(id);
		return res.status(200).send({ ok: true, data: transctionsData });
	} catch (e) {
		console.log("ERROR IN  TRANSACTIONS ROUTE GET METHOD", e.message);
		return res.status(500).send({ ok: false, message: e.message });
	}
});

transactionRoute.post("/", async (req, res) => {
	try {
		await addNewTransaction(req.body, req.id);
		res
			.status(201)
			.send({ ok: true, message: "Transaction added successfully" });
	} catch (e) {
		console.log("ERROR IN TRANSACTION ROUTE POST METHOD  ", e.message);
		return res.status(500).send({ ok: false, message: e.message });
	}
});

transactionRoute.patch("/", async (req, res) => {
	try {
		await updateTransaction(req.body);
		res
			.status(200)
			.send({ ok: true, message: "Transaction updated successfully." });
	} catch (e) {
		console.log("ERROR IN TRANSACTION ROUTE PATCH METHOD", e.message);
		return res.status(500).send({ ok: false, message: e.message });
	}
});

transactionRoute.delete("/:transId", async (req, res) => {
	try {
		let { transId } = req.params;
		await removeTransaction(transId);
		res
			.status(200)
			.send({ ok: true, message: "Transaction deleted successfully " });
	} catch (e) {
		console.log("ERROR IN TRANSACTION ROUTE DELETE METHOD ", e.message);
		return res.status(500).send({ ok: false, message: e.message });
	}
});

module.exports = transactionRoute;
