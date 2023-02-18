export default function getDailyTotal(list) {
	let balance = list.reduce((a, el) => {
		if (el.type === "income") {
			return a + el.amount;
		}
		return a - el.amount;
	}, 0);
	return balance;
}
