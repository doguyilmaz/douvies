const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const UserSetting = require('../models/UserSetting');

// @route   POST douvies/users
// @desc    Register User
// @access  Public
router.post(
	'/',
	[
		check('name.first', 'firstName is required!').notEmpty(),
		check('name.last', 'lastName is required!').notEmpty(),
		check('username', 'username is required!').notEmpty(),
		check('username', 'username length between 6-12').isLength({
			min: 6,
			max: 12,
		}),
		check('email', 'Enter a valid email!').isEmail(),
		check('password', 'Enter a password between 6 - 12 digits!').isLength({
			min: 6,
			max: 12,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, username, email, password } = req.body;

		try {
			// See if user or username exists?
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists!' }] });
			}
			user = await User.findOne({ username });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Username already exists!' }] });
			}

			// Get users gravatar @based on email
			// const avatar = gravatar.url(email, {
			// 	s: '200',
			// 	r: 'pg',
			// 	d: 'mm'
			// });

			user = new User({
				name,
				email,
				username,
				// avatar,
				password,
			});

			// Encrpyt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			// Create User default Settings
			const newUserSetting = new UserSetting({
				user: user.id,
			});

			await user.save();
			await newUserSetting.save();

			// Return jwt @because after register user need to logged in
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				// LATER:
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;