const Transactions = require("../model/transactions.model");
const User = require("../model/user.model");

async function addNewTransaction({ type, category, amount, date }, userId) {
	try {
		amount = parseInt(amount);
		date = parseInt(date);

		let newTransaction = await Transactions.create({
			user: userId,
			type,
			category,
			date,
			amount,
		});

		await newTransaction.save();
		await User.findByIdAndUpdate(userId, {
			$push: { transactions: newTransaction._id },
		});
	} catch (e) {
		console.log("ERROR IN CREATING NEW TRANSACTION", e.message);
		throw new Error(e.message);
	}
}
module.exports = addNewTransaction;
