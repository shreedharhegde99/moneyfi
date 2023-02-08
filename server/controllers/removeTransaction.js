const Transactions = require("../model/transactions.model");

async function removeTransaction(id) {
	try {
		await Transactions.findByIdAndRemove(id);
	} catch (e) {
		console.log("ERROR IN REMOVING TRANSACTION", e.message);
		throw new Error(e.message);
	}
}

module.exports = removeTransaction;
