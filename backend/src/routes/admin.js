const express = require('express');
const {
	createUser,
	getAllUsers,
	getSingleUserByUID,
	getSingleUserByPID,
	updateUserByUID,
	updateUserByPID,
	deleteUserByUID,
	deleteUserByPID,
	getAllProfiles,
	getSingleProfileByPID,
	getSingleProfileByUID,
	updateProfileByPID,
	updateProfileByUID,
	deleteProfileByPID,
	deleteProfileByUID,
} = require('../controllers/admin.controller');

const { protect, authorize } = require('../middlewares/auth');

const { roles } = require('../utils/constants');

const router = express.Router();

// For all routes using admin role & protection so
router.use(protect);
router.use(authorize(roles.ADMIN_ROLE));

router.post('/users', createUser);

router.get('/users', getAllUsers); // Advanced Results
router.get('/users/:id', getSingleUserByUID);
router.get('/profiles/:id/user', getSingleUserByPID);

router.get('/profiles', getAllProfiles); // Advanced Results
router.get('/profiles/:id', getSingleProfileByPID);
router.get('/users/:id/profile', getSingleProfileByUID);

router.put('/users/:id', updateUserByUID);
router.put('/profiles/:id/user', updateUserByPID);
router.put('/profiles/:id', updateProfileByPID);
router.put('/users/:id/profile', updateProfileByUID);

router.delete('/users/:id', deleteUserByUID);
router.delete('/profiles/:id/user', deleteUserByPID);
router.delete('/profiles/:id', deleteProfileByPID);
router.delete('/users/:id/profile', deleteProfileByUID);

module.exports = router;
