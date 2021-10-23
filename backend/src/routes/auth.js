const express = require('express');
const {
	getLoggedIn,
	register,
	login,
	logout,
	updatePassword,
} = require('../controllers/auth.controller');

const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// router.get('/', protect, getLoggedInUser);
router.get('/me', protect, getLoggedIn);
router.get('/logout', protect, logout);

router.post('/login', login);
router.post('/register', register);

router.put('/me/password', protect, updatePassword);

// DELETE USER JUST WANT TO DELETE

module.exports = router;
