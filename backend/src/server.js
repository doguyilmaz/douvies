const errorHandler = require('./middlewares/errorHandler');

const app = require('./app');

// Custom Error Handler for express next()
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// LISTEN
const server = app.listen(PORT, () => {
	console.log(
		`Server running in "${process.env.NODE_ENV}" mode on port ${PORT}`.blue.bold
	);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.bgRed.bold);
	// Close server & exit process
	server.close(() => process.exit(1));
});
