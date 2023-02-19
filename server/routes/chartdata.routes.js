const getChartData = require("../controllers/getChartData");
const getCurrentMonth = require("../controllers/getCurrentMonth");
const validateUser = require("../controllers/validateUser");
const chartRoute = require("express").Router();
const convertDateMs = require("../controllers/convertDateMs");

chartRoute.use(validateUser);

chartRoute.get("/", async (req, res) => {
	try {
		const { start, end } = getCurrentMonth();
		let data = await getChartData(req.id, start, end);

		return res.status(200).send({ ok: true, data });
	} catch (e) {
		console.log("ERROR IN CHART DATA", e.message);
		return res.status(500).send({ ok: false, message: e.message });
	}
});

chartRoute.get("/custom", async (req, res) => {
	try {
		const { from, to } = req.query;
		const [start, end] = [convertDateMs(from), convertDateMs(to)];
		let data = await getChartData(req.id, start, end);

		return res.status(200).send({ ok: true, data });
	} catch (e) {
		console.log("ERROR IN FETCHING CUSTOM CHART DATA", e.message);
		return res.status(500).send({ ok: false, message: e.message });
	}
});

module.exports = chartRoute;
