const express = require('express');
const {
	getMe,
	updateMe,
	updateMyProfile,
	getAllUsers,
	getSingleUser,
	resetProfile,
} = require('../controllers/users.controller');

const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/me', protect, getMe);
router.get('/:id', getSingleUser);
router.get('/', getAllUsers);

router.get('/me/profile/reset', protect, resetProfile);

router.put('/me/info', protect, updateMe);
router.put('/me/profile', protect, updateMyProfile);

module.exports = router;
