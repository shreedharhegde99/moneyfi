const getChartData = require("../controllers/getChartData");
const getCurrentMonth = require("../controllers/getCurrentMonth");
const validateUser = require("../controllers/validateUser");
const chartRoute = require("express").Router();
const convertDateMs = require("../controllers/convertDateMs");

chartRoute.use(validateUser);
chartRoute.get("/", async (req, res) => {
	try {
		const { from, to } = req.query;
		let data = await getChartData(req.id, Number(from), Number(to));

		return res.status(200).send({ ok: true, data });
	} catch (e) {
		console.log("ERROR IN FETCHING CUSTOM CHART DATA", e.message);
		return res.status(500).send({ ok: false, message: e.message });
	}
});

module.exports = chartRoute;
