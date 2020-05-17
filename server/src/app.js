const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const connectDB = require('./config/db');

// Load env file
dotenv.config();

// DB CONNECTION
connectDB();

const app = express();

// INIT MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sanitize Data
app.use(mongoSanitize());

// Set Security Headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate Limiting
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 mins
	max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS // If API is public
app.use(cors());

// Morgan Logger
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Set static folder for upload images etc.
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/douvies/auth', require('./routes/auth.routes'));
app.use('/douvies/users', require('./routes/users.routes'));
app.use('/douvies/movies', require('./routes/movies.routes'));
app.use('/douvies/series', require('./routes/series.routes'));
app.use('/douvies/profile', require('./routes/profiles.routes'));

module.exports = app;
