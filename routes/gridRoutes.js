const express = require('express');

const router = express.Router();

const { getAllGrids, getOneGrid } = require('../controllers/gridController');

router.route('/').get(getAllGrids);
router.route('/:id').get(getOneGrid);

module.exports = router;
