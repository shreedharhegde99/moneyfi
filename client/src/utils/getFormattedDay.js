export default function getFormattedDay(ms) {
	let date = new Date(ms).toLocaleString();
	let dateString = date.split(",");
	let [d, m, y] = dateString[0].split("/");

	return `${y}-${m}-${d}`;
}
