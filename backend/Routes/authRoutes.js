const express = require('express');
const { register, login, getProfile } = require('../Controllers/authController');
const {authenticate, authorize} = require('../Middleware/auth');
const router = express.Router();

router.post('/register', authenticate, authorize('admin'), register); // only admin can add the new user
router.post('/login', login);
router.get('/me', authenticate, getProfile);

module.exports = router;     
