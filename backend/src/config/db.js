const mongoose = require('mongoose');
// FIX: CHECK NODE_ENV ?

const connectDB = async () => {
	const dbURI =
		process.env.NODE_ENV === 'production' && process.env.MONGODB_URI_CLOUD
			? process.env.MONGODB_URI_CLOUD
			: process.env.MONGODB_URI_LOCAL;

	const conn = await mongoose.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	});
	console.log(`MongoDB Connected: ${conn.connection.host}`.yellow.bold);
};

module.exports = connectDB;
