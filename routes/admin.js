const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/post-anime', adminController.postAnime);

module.exports = router;
