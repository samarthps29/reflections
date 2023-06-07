const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	let header = req.headers.authorization;
	if (header) {
		const start = req.headers.authorization.split(" ")[0].trim();
		const token = req.headers.authorization.split(" ")[1].trim();
		if (start != "Bearer" || token === "") {
			res.status(400).json({ message: "Invalid Token" });
		} else {
			jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
				if (err) {
					res.status(400).json({
						message: "Invalid Token/Token Expired",
					});
				}
				req.user = decoded;
				next();
			});
		}
	} else {
		res.status(400).json({ message: "No token provided" });
	}
};

module.exports = verifyToken;
