const mongoose = require("mongoose");
const Transaction = require("../model/transactions.model");

async function getTransactionData(id, start, end) {
	try {
		let user = mongoose.Types.ObjectId(id);

		let data = await Transaction.aggregate([
			{ $match: { user } },
			{
				$match: {
					$and: [
						{ date: { $gte: Number(start) } },
						{ date: { $lte: Number(end) } },
					],
				},
			},
			{ $group: { _id: "$date", transactions: { $push: "$$ROOT" } } },
			{ $project: { date: "$_id", _id: 0, transactions: 1 } },
			{ $sort: { date: -1 } },
		]);

		return data;
	} catch (e) {
		console.log("ERROR IN FETCHING TRANSACTION DATA FROM DATABASE", e.message);
		throw new Error(e.message);
	}
}

module.exports = getTransactionData;
