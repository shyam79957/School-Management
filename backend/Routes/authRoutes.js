const express = require('express');
const { register, login, getProfile } = require('../Controllers/authController');
const {authenticate, authorize} = require('../Middleware/auth');
const router = express.Router();

router.post('/register', register); 
router.post('/login', login);
router.get('/profile/:id', authenticate, getProfile);

module.exports = router;     
