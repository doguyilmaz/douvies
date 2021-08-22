const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const CustomError = require('../utils/CustomError');
const User = require('../models/User');

// Protect Routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	// Check the header
	// Token in the header with Bearer
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	}
	// Token with cookies
	else if (req.cookies.token) {
		token = req.cookies.token;
	}

	// Check token exists
	if (!token) {
		return next(new CustomError('No token, authorization denied!', 401));
	}

	// Verify token
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await User.findById(decoded.id);
		next();
	} catch (err) {
		return next(new CustomError('Token is not valid, authorization denied!', 401));
	}
});

// Grant access to specific roles
exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req?.user?.role)) {
			return next(
				new CustomError(`Role: <${req?.user?.role || 'none'}> is not authorized to access this content!`, 403)
			);
		}
		next();
	};
};
