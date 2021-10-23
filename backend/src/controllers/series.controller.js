const CustomError = require('../utils/CustomError');
const asyncHandler = require('../middlewares/asyncHandler');

const Serie = require('../models/Serie');

// @desc      Add/Create serie
// @route     POST /api/v1/series
// @access    Private
exports.addSerie = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;
	const serie = await Serie.create(req.body);

	res.status(201).json({
		success: true,
		data: serie,
	});
});

// @desc      Get upcoming series?
// @route     GET /api/v1/series/soon
// @access    Public
exports.getUpcomingSeries = asyncHandler(async (req, res, next) => {
	res.json({
		success: true,
		msg: 'Get upcoming series',
	});
});

// @desc      Get all series (owner)
// @route     GET /api/v1/series
// @access    Private
exports.getAllSeries = asyncHandler(async (req, res, next) => {
	const series = await Serie.find({ user: req.user.id });

	res.json({
		success: true,
		data: series,
	});
});

// @desc      Get single serie (owner)
// @route     GET /api/v1/series/:id
// @access    Private
exports.getSerie = asyncHandler(async (req, res, next) => {
	const serie = await Serie.findById(req.params.id);

	if (!serie) {
		return next(new CustomError('Serie does not exist!', 404));
	}

	// Make sure is the admin or owner of serie?
	if (serie.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new CustomError(`Not authorized to access this content!`, 401));
	}

	res.json({
		success: true,
		data: serie,
	});
});

// @desc      Update serie (owner)
// @route     PUT /api/v1/series/:id
// @access    Private
exports.updateSerie = asyncHandler(async (req, res, next) => {
	let serie = await Serie.findById(req.params.id);

	// Check if serie exists
	if (!serie) {
		return next(new CustomError('Serie does not exist!', 404));
	}

	// Make sure is the admin or owner of serie?
	if (serie.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new CustomError(`Not authorized to access this content!`, 401));
	}

	req.body.updatedAt = Date.now();
	serie = await Serie.findByIdAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true,
	});

	res.json({
		success: true,
		data: serie,
	});
});

// @desc      Delete serie (owner)
// @route     DELETE /api/v1/series/:id
// @access    Private
exports.deleteSerie = asyncHandler(async (req, res, next) => {
	let serie = await Serie.findById(req.params.id);

	// Check if serie exists
	if (!serie) {
		return next(new CustomError('Serie does not exist!', 404));
	}

	// Make sure is the admin or owner of serie?
	if (serie.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new CustomError(`Not authorized to access this content!`, 401));
	}

	await serie.remove();

	res.json({
		success: true,
		data: {},
	});
});
