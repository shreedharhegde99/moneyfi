const Transactions = require("../model/transactions.model");

async function updateTransaction({ _id, ...update }) {
	try {
		console.log(`=>  update`, update);
		await Transactions.findById(_id).updateOne({
			$set: update,
		});
	} catch (e) {
		console.log("ERROR IN UPDATING TRNSACTION DETAILS ", e.message);
		throw new Error(e.message);
	}
}

module.exports = updateTransaction;
