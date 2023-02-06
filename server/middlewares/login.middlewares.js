async function loginValidator(req, res, next) {
	try {
		const { email, password } = req.body;
		if (email && password) {
			return next();
		}

		return res
			.status(400)
			.send({ ok: false, message: "Missing required fields" });
	} catch (e) {
		console.log("ERROR IN FETCHING", e.message);
		throw new Error(e.message);
	}
}

module.exports = loginValidator;
