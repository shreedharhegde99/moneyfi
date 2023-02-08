const User = require("../model/user.model");

async function getTransactionData(id) {
	try {
		let { transactions } = await User.findById(id)
			.select({ _id: 0, transactions: 1 })
			.populate("transactions");
		return transactions;
	} catch (e) {
		console.log("ERROR IN FETCHING TRANSACTION DATA FROM DATABASE", e.message);
		throw new Error(e.message);
	}
}

module.exports = getTransactionData;
