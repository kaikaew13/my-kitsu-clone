const express = require('express');

const websiteController = require('../controllers/website');
const { isAuth } = require('../helper');

const router = express.Router();

router.get('/get-home', websiteController.getHome);
router.put('/add-to-library', isAuth, websiteController.addToLibrary);

module.exports = router;
