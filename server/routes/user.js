const express = require('express');

const { isAuth } = require('../helper');
const userController = require('../controllers/user');

const router = express.Router();

router.put('/add-to-library', isAuth, userController.addToLibrary);

// router.get('/get-animelist', isAuth, userController.getAnimelist);

router.get('/get-user', isAuth, userController.getUser);

router.put('/follow-user', isAuth, userController.followUser);
router.put('/unfollow-user', isAuth, userController.unfollowUser);

router.post('/post-reaction', isAuth, userController.postReaction);
router.put('/put-reaction', isAuth, userController.putReaction);
router.delete('/delete-reaction', isAuth, userController.deleteReaction);

router.put('/upvote', isAuth, userController.putUpvote);
router.put('/un-upvote', isAuth, userController.putUnUpvote);

module.exports = router;
