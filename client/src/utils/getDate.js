const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
export default function getDate(ms) {
	let day = new Date(ms);
	let res = `${day.getDate()} ${months[day.getMonth()]} ${day.getFullYear()}, ${
		days[day.getDay()]
	}`;

	return res;
}
