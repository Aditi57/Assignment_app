const express = require('express');
const { registerAdmin, loginAdmin, getAssignments, acceptAssignment, rejectAssignment} = require('../controllers/adminController');
const {protect_admin } = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/assignments', protect_admin, getAssignments);
router.post('/assignments/:id/accept', protect_admin, acceptAssignment);
router.post('/assignments/:id/reject', protect_admin, rejectAssignment);


module.exports = router;
