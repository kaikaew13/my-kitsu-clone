const express = require('express');

const adminController = require('../controllers/admin');
const { isAuth } = require('../helper');

const router = express.Router();

router.post('/post-anime', isAuth, adminController.postAnime);
router.put('/put-anime', isAuth, adminController.putAnime);

module.exports = router;
