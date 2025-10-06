const express = require('express');
const router = express.Router();
const { register, login , verifyByEmail } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.get("/verify", verifyByEmail);

module.exports = router;
