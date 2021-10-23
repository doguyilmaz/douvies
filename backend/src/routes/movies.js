const express = require('express');
const {
	addMovie,
	getUpcomingMovies,
	getAllMovies,
	getMovie,
	updateMovie,
	deleteMovie,
} = require('../controllers/movies.controller');

const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// router.get('/favourites', protect, getFavourites);

router.get('/soon', getUpcomingMovies);
router.get('/:id', protect, getMovie);
router.get('/', protect, getAllMovies);

router.post('/', protect, addMovie);

router.put('/:id', protect, updateMovie);

router.delete('/:id', protect, deleteMovie);

module.exports = router;
