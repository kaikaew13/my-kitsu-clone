const express = require('express');

const { isAuth } = require('../helper');
const userController = require('../controllers/user');

const router = express.Router();

router.put('/add-to-library', isAuth, userController.addToLibrary);

router.get('/get-animelist', isAuth, userController.getAnimelist);

module.exports = router;
