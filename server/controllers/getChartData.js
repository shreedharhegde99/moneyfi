const { default: mongoose } = require("mongoose");
const Transactions = require("../model/transactions.model");
const getCurrentMonth = require("./getCurrentMonth");

async function getChartData(id, start, end) {
	try {
		let data = await Transactions.aggregate([
			{
				$match: { user: mongoose.Types.ObjectId(id) },
			},
			{
				$match: { $and: [{ date: { $gte: start } }, { date: { $lte: end } }] },
			},

			{
				$group: {
					_id: "$category",
					total: { $sum: "$amount" },
				},
			},
			{
				$project: {
					category: "$_id",
					amount: "$total",
					_id: 0,
				},
			},
		]);

		return data;
	} catch (e) {
		console.log("ERROR IN FETCHING MONTHLY TRANSACTION DATA", e.message);
		throw new Error(e.message);
	}
}
module.exports = getChartData;
