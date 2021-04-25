const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 }),
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;
