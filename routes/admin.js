const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/post-anime', adminController.postAnime);
router.get('/get-anime', adminController.getAnime);
router.get('/get-anime/:animeId', adminController.getSingleAnime);

module.exports = router;
