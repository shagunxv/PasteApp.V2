const express = require('express');
const router = express.Router();

const { registerUser,loginUser, getUserDashboard } = require('../controllers/authCont');
const { protect, validateLoginInput } = require('../middleware/appMW');

router.post('/register', registerUser);
router.post('/login',validateLoginInput,loginUser);
router.get('/dashboard',protect, getUserDashboard);

module.exports = router;