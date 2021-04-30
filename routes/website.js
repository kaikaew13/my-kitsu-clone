const express = require('express');

const websiteController = require('../controllers/website');

const router = express.Router();

router.get('/get-home', websiteController.getHome);

module.exports = router;
