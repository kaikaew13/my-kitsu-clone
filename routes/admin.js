const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const { isAuth } = require('../helper');

const router = express.Router();

router.post(
  '/post-anime',
  isAuth,
  adminController.isAdmin,
  [
    body('title').trim().isLength({ min: 3 }),
    body('description').trim().isLength({ min: 5 }),
  ],
  adminController.postAnime
);
router.put(
  '/put-anime',
  isAuth,
  adminController.isAdmin,
  [
    body('title')
      .trim()
      .custom((value) => {
        if (value.length > 0 && value.length < 3)
          throw new Error('new title too short');
        return true;
      }),
    body('description')
      .trim()
      .custom((value) => {
        if (value.length > 0 && value.length < 5)
          throw new Error('new description too short');
        return true;
      }),
  ],
  adminController.putAnime
);

module.exports = router;
