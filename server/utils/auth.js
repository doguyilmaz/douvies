const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');

	// Check if no token
	if (!token) {
		return res.status(401).json({
			success: false,
			msg: 'No token, authorization denied!',
		});
	}

	// Verify Token
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({
			success: false,
			msg: 'Token is not valid!',
		});
	}
};
