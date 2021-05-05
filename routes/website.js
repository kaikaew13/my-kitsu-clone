const express = require('express');

const websiteController = require('../controllers/website');
const { isAuth } = require('../helper');

const router = express.Router();

router.get('/get-home', websiteController.getHome);
router.get('/get-each-anime/:animeId', websiteController.getEachAnime);

module.exports = router;
