const CustomError = require('../utils/CustomError');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	//cuz of enumerable properties
	error.message = err.message;

	// Error log
	console.log(err.stack.red);

	// Mongoose bad ObjectId - CastError
	if (err.name === 'CastError') {
		error = new CustomError('Resource not found.', 404);
	}

	// Mongoose duplicate key - MongoError - 11000
	if (err.code === 11000) {
		error = new CustomError(
			'Duplicate field value entered, related field must be unique.',
			400
		);
	}

	// Mongoose validation error - ValidationError
	if (err.name === 'ValidationError') {
		error = new CustomError(
			Object.values(err.errors).map((value) => value.message),
			400
		);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message || 'Internal Server Error',
		data: null,
	});
};

module.exports = errorHandler;
