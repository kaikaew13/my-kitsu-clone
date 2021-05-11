const express = require('express');

const websiteController = require('../controllers/website');
const { isAuth } = require('../helper');

const router = express.Router();

router.get('/get-home/:limit/:status', websiteController.getHome);
router.get('/get-each-anime/:animeId', websiteController.getEachAnime);
router.get('/get-each-reaction/:reactionId', websiteController.getEachReaction);
router.get('/get-other-user/:userId', websiteController.getOtherUser);

module.exports = router;
