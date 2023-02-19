const convertDateMs = require("./convertDateMs");
function getCurrentMonth() {
	const date = new Date();
	const month = date.getMonth();
	const year = date.getFullYear();
	const startDate = new Date(year, month, 1);

	const start = convertDateMs(startDate);
	const end = convertDateMs(new Date());

	return { start, end };
}

module.exports = getCurrentMonth;
