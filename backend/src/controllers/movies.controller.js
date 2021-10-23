const CustomError = require('../utils/CustomError');
const asyncHandler = require('../middlewares/asyncHandler');

const Movie = require('../models/Movie');

// @desc      Add/Create movie
// @route     POST /api/v1/movies
// @access    Private
exports.addMovie = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;
	const movie = await Movie.create(req.body);

	res.status(201).json({
		success: true,
		data: movie,
	});
});

// @desc      Get upcoming movies?
// @route     GET /api/v1/movies/soon
// @access    Public
exports.getUpcomingMovies = asyncHandler(async (req, res, next) => {
	res.json({
		success: true,
		msg: 'Get upcoming movies',
	});
});

// @desc      Get all movies (owner)
// @route     GET /api/v1/movies
// @access    Private
exports.getAllMovies = asyncHandler(async (req, res, next) => {
	const movies = await Movie.find({ user: req.user.id });

	res.json({
		success: true,
		data: movies,
	});
});

// @desc      Get single movie (owner)
// @route     GET /api/v1/movies/:id
// @access    Private
exports.getMovie = asyncHandler(async (req, res, next) => {
	const movie = await Movie.findById(req.params.id);

	if (!movie) {
		return next(new CustomError('Movie does not exist!', 404));
	}

	// Make sure is the admin or owner of movie?
	if (movie.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new CustomError(`Not authorized to access this content!`, 401));
	}

	res.json({
		success: true,
		data: movie,
	});
});

// @desc      Update movie (owner)
// @route     PUT /api/v1/movies/:id
// @access    Private
exports.updateMovie = asyncHandler(async (req, res, next) => {
	let movie = await Movie.findById(req.params.id);

	// Check if movie exists
	if (!movie) {
		return next(new CustomError('Movie does not exist!', 404));
	}

	// Make sure is the admin or owner of movie?
	if (movie.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new CustomError(`Not authorized to access this content!`, 401));
	}

	req.body.updatedAt = Date.now();
	movie = await Movie.findByIdAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true,
	});

	res.json({
		success: true,
		data: movie,
	});
});

// @desc      Delete movie (owner)
// @route     DELETE /api/v1/movies/:id
// @access    Private
exports.deleteMovie = asyncHandler(async (req, res, next) => {
	let movie = await Movie.findById(req.params.id);

	// Check if movie exists
	if (!movie) {
		return next(new CustomError('Movie does not exist!', 404));
	}

	// Make sure is the admin or owner of movie?
	if (movie.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new CustomError(`Not authorized to access this content!`, 401));
	}

	await movie.remove();

	res.json({
		success: true,
		data: {},
	});
});
