const express = require('express');
const {
	addSerie,
	getUpcomingSeries,
	getAllSeries,
	getSerie,
	updateSerie,
	deleteSerie,
} = require('../controllers/series.controller');

const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// router.get('/favourites', protect, getFavourites);

router.get('/soon', getUpcomingSeries);
router.get('/:id', protect, getSerie);
router.get('/', protect, getAllSeries);

router.post('/', protect, addSerie);

router.put('/:id', protect, updateSerie);

router.delete('/:id', protect, deleteSerie);

module.exports = router;
