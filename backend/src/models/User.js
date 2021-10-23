const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { roles } = require('../utils/constants');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required.'],
		},
		username: {
			type: String,
			required: [true, 'Username is required.'],
			minlength: [3, 'Username should be at least 3 characters!'],
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required.'],
			unique: true,
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email.'],
		},
		password: {
			type: String,
			required: [true, 'Password is required.'],
			minlength: 6,
			select: false,
		},
		resetPasswordToken: String,
		resetPasswordExpire: Date,
		role: {
			type: String,
			enum: Object.values(roles),
			default: roles.USER_ROLE,
		},
		profile: {
			type: mongoose.Schema.Types.ObjectId,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		// id: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Reverse populate with virtuals
UserSchema.virtual('settings', {
	ref: 'Profile',
	localField: '_id',
	foreignField: 'user',
	justOne: true,
});

// Tranforms the first characters of each names
UserSchema.pre('save', function (next) {
	let tempName = '';
	this.name
		.trim()
		.split(' ')
		.forEach((el) => (tempName += el.charAt(0).toUpperCase() + el.slice(1) + ' '));
	this.name = tempName.trim();
	next();
});

// Encrypt password using bcrypt before save
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10); // Generated Salt
	this.password = await bcrypt.hash(this.password, salt); // Hashed password
	next();
});

// Cascade delete profile when a user was deleted
// Then others lists, movies, series etc...
UserSchema.pre('remove', async function (next) {
	await this.model('Profile').deleteMany({ user: this._id });
	next();
});

// Sign JWT and Return Token
UserSchema.methods.getSignedJWTToken = function () {
	// const payload = {
	// 	user: {
	// 		id: this._id,
	// 	},
	// };
	const payload = {
		id: this._id,
	};
	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE_TIME,
	});
};

// Match user entered password to hashed password in db
UserSchema.methods.isMatchedPassword = async function (passwordInput) {
	return await bcrypt.compare(passwordInput, this.password);
};

// Generate & Hash password token
UserSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString('hex'); // Generate token

	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // Hash Token & Set to resetPasswordToken field in db

	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Set Expire Time for Token

	return resetToken;
};

// Get & Set Profile id to related(this) user on create
UserSchema.methods.setProfile = function (profileId) {
	this.profile = profileId;
	this.save();
};

module.exports = User = mongoose.model('user', UserSchema);
