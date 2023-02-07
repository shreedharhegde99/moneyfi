export default function getToken() {
	const token = JSON.parse(localStorage.getItem("user-token")) || null;
	return token;
}
