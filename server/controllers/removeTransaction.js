const Transactions = require("../model/transactions.model");
const User = require("../model/user.model");

async function removeTransaction(id, userId) {
	try {
		await Transactions.findByIdAndRemove(id);
		await User.findByIdAndUpdate(userId, { $pull: { transactions: id } });
	} catch (e) {
		console.log("ERROR IN REMOVING TRANSACTION", e.message);
		throw new Error(e.message);
	}
}

module.exports = removeTransaction;
