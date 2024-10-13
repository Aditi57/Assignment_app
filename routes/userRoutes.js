const express = require('express');
const { registerUser, loginUser, uploadAssignment, getAdmins } = require('../controllers/userController');
const { protect_user } = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', protect_user, uploadAssignment);
router.get('/admins', protect_user, getAdmins);

module.exports = router;
