export default function storeToken(token) {
	localStorage.setItem("user-token", JSON.stringify(token));
}
