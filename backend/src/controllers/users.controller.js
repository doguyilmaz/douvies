const CustomError = require('../utils/CustomError');
const asyncHandler = require('../middlewares/asyncHandler');
const mongoose = require('mongoose');

const { roles } = require('../utils/constants');

const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc      Get current logged in user
// @route     GET /api/v1/users/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id).populate('settings');

	res.status(200).json({
		success: true,
		data: user,
	});
});

// @desc      Update logged in user (self)
// @route     PUT /api/v1/users/me/info
// @access    Private
exports.updateMe = asyncHandler(async (req, res, next) => {
	// check if role change && isAdmin
	if (
		req.body.hasOwnProperty(roles.ROLE) &&
		req.user.role !== roles.ADMIN_ROLE
	) {
		return next(new CustomError('Not authorized!', 401));
	}

	req.body.updatedAt = Date.now();
	const user = await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		success: true,
		data: user,
	});
});

// @desc      Update logged in user profile (self)
// @route     PUT /api/v1/users/me/profile
// @access    Private
exports.updateMyProfile = asyncHandler(async (req, res, next) => {
	req.body.updatedAt = Date.now();
	const profile = await Profile.findOneAndUpdate({ user: req.user }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!profile) {
		return next(new CustomError('Profile cannot found.', 404));
	}

	res.status(200).json({
		success: true,
		data: profile,
	});
});

// @desc      Get all users & profiles
// @route     GET /api/v1/users
// @access    Public
exports.getAllUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find().populate('settings');

	res.status(200).json({
		success: true,
		data: users,
	});
});

// @desc      Get a single user
// @route     GET /api/v1/users/:id
// @access    Public
exports.getSingleUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id).populate({
		path: 'lists',
		select: 'favourites',
	});

	if (!user) {
		return next(new CustomError('User does not exist!', 404));
	}

	res.json({
		success: true,
		data: user,
	});
});

// @desc      Reset Profile & Settings
// @route     GET /api/v1/users/me/profile/reset
// @access    Private
exports.resetProfile = asyncHandler(async (req, res, next) => {
	res.status(200).json({
		success: true,
		msg: 'Profile delete, reset to default settings',
	});
});
