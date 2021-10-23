const CustomError = require('../utils/CustomError');
const asyncHandler = require('../middlewares/asyncHandler');

const User = require('../models/User');
const Profile = require('../models/Profile');

// @desc      Create user
// @route     POST /api/v1/admin/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
	const user = await User.create(req.body);

	// Create default profile
	const profile = await Profile.create({ user: user._id });

	// Send created profile's id to user
	await user.setProfile(profile._id);

	//LATER:
	// admin(super admin) can create admin/publisher/
	// also add for approving availability for pending publisher/admin requests
	res.status(201).json({
		success: true,
		data: user,
	});
});

// @desc      Get all users
// @route     GET /api/v1/admin/users
// @access    Private/Admin
exports.getAllUsers = asyncHandler(async (req, res, next) => {
	const users = await User.find().populate('settings');
	res.status(200).json({
		success: true,
		data: users,
	});
	// res.status(200).json(res.advancedResults);
});

// @desc      Get single user by user id
// @route     GET /api/v1/admin/users/:id
// @access    Private/Admin
exports.getSingleUserByUID = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new CustomError(`User not found ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: user,
	});
});

// @desc      Get single user by profile id
// @route     GET /api/v1/admin/profiles/:id/user
// @access    Private/Admin
exports.getSingleUserByPID = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ profile: req.params.id });

	if (!user) {
		return next(new CustomError(`User not found ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: user,
	});
});

// @desc      Update user by user id
// @route     PUT /api/v1/admin/users/:id
// @access    Private/Admin
exports.updateUserByUID = asyncHandler(async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!user) {
		return next(new CustomError(`User not found ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: user,
	});
});

// @desc      Update user by profile id
// @route     PUT /api/v1/admin/profiles/:id/user
// @access    Private/Admin
exports.updateUserByPID = asyncHandler(async (req, res, next) => {
	const user = await User.findOneAndUpdate(
		{ profile: req.params.id },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!user) {
		return next(new CustomError(`User not found ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: user,
	});
});

// @desc      Delete user by user id
// @route     DELETE /api/v1/admin/users/:id
// @access    Private/Admin
exports.deleteUserByUID = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new CustomError(`User not found ${req.params.id}`, 404));
	}

	// Delete also users profile
	// Here or hooks with mongoose
	// Preferred mongoose hooks in User model

	await user.remove();

	res.status(200).json({
		success: true,
		msg: 'User deleted successfully.',
		data: {},
	});
});

// @desc      Delete user by profile id
// @route     DELETE /api/v1/admin/profiles/:id/user
// @access    Private/Admin
exports.deleteUserByPID = asyncHandler(async (req, res, next) => {
	const user = await User.findOneAndRemove({ profile: req.params.id });

	// Delete also users profile
	// Here or hooks with mongoose
	// Preferred mongoose hooks in User model

	if (!user) {
		return next(new CustomError(`User not found ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		msg: 'User deleted successfully.',
		data: {},
	});
});

// @desc      Get all profiles
// @route     GET /api/v1/admin/profiles
// @access    Private/Admin
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
	const profiles = await Profile.find();
	res.status(200).json({
		success: true,
		data: profiles,
	});
	// res.status(200).json(res.advancedResults);
});

// @desc      Get single profile by profile id
// @route     GET /api/v1/admin/profiles/:id
// @access    Private/Admin
exports.getSingleProfileByPID = asyncHandler(async (req, res, next) => {
	const profile = await Profile.findById(req.params.id);

	if (!profile) {
		return next(new CustomError(`Profile not found ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: profile,
	});
});

// @desc      Get single profile by user id
// @route     GET /api/v1/admin/users/:id/profile
// @access    Private/Admin
exports.getSingleProfileByUID = asyncHandler(async (req, res, next) => {
	const profile = await Profile.findOne({ user: req.params.id });

	if (!profile) {
		return next(new CustomError(`Profile not found ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: profile,
	});
});

// @desc      Update profile by profile id
// @route     PUT /api/v1/admin/profiles/:id
// @access    Private/Admin
exports.updateProfileByPID = asyncHandler(async (req, res, next) => {
	const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!profile) {
		return next(new CustomError(`Profile not found ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: profile,
	});
});

// @desc      Update profile by user id
// @route     PUT /api/v1/admin/users/:id/profile
// @access    Private/Admin
exports.updateProfileByUID = asyncHandler(async (req, res, next) => {
	const profile = await Profile.findOneAndUpdate(
		{ user: req.params.id },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!profile) {
		return next(new CustomError(`Profile not found ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		data: profile,
	});
});

// @desc      Delete profile by profile id
// @route     DELETE /api/v1/admin/profiles/:id
// @access    Private/Admin
exports.deleteProfileByPID = asyncHandler(async (req, res, next) => {
	const profile = await Profile.findByIdAndDelete(req.params.id);

	if (!profile) {
		return next(new CustomError(`Profile not found ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		msg: 'Profile deleted successfully.',
		data: {},
	});
});

// @desc      Delete profile by user id
// @route     DELETE /api/v1/admin/users/:id/profile
// @access    Private/Admin
exports.deleteProfileByUID = asyncHandler(async (req, res, next) => {
	const profile = await Profile.findOneAndRemove({ user: req.params.id });

	if (!profile) {
		return next(new CustomError(`Profile not found ${req.params.id}`, 404));
	}

	res.status(200).json({
		success: true,
		msg: 'Profile deleted successfully.',
		data: {},
	});
});
