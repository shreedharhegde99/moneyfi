async function validateSignup(req, res, next) {
	try {
		const { name, email, password } = req.body;
		if (name && email && password) {
			return next();
		}

		return res
			.status(400)
			.send({ ok: false, message: "Missing required fields" });
	} catch (e) {
		console.log("ERROR IN SIGNUP VALIDATION", e.message);
	}
}

module.exports = validateSignup;
