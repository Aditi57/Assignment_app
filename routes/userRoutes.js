const express = require('express');
const { registerUser, loginUser, uploadAssignment, getAdmins } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', protect, uploadAssignment);
router.get('/admins', protect, getAdmins);

module.exports = router;
