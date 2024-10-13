const Assignment = require('../models/assignmentModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const checkAdmin = (username) => {
    const admin = User.findOne({username});
    if (!admin ){
        return false;
    }
    else if(admin.role == user){
        return false;
    }
    else{
        return true;
    }
}
// Admin registration
exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;

    const adminExists = await User.findOne({ username });

    if (adminExists) {
        return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await User.create({ username, password, role: 'admin' });

    if (admin) {
        res.status(201).json({ message: 'Admin registered successfully' });
    } else {
        res.status(400).json({ message: 'Invalid admin data' });
    }
};

// Admin login
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    const admin = await User.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};



// View assignments tagged to admin
exports.getAssignments = async (req, res) => {
    const assignments = await Assignment.find({ admin: req.user._id }).populate('userId', 'username');
    res.json(assignments);
};

// Accept assignment
exports.acceptAssignment = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const assignment = await Assignment.findById(id);
    console.log(assignment)
    if (checkAdmin (req.user))
    if (assignment && assignment.admin.equals(req.user._id)) {
        assignment.status = 'accepted';
        await assignment.save();
        res.json({ message: 'Assignment accepted' });
    } else {
        res.status(404).json({ message: 'Assignment not found' });
    }
};

// Reject assignment
exports.rejectAssignment = async (req, res) => {
    const { id } = req.params;
    const assignment = await Assignment.findById(id);

    if (assignment && assignment.admin.equals(req.user._id)) {
        assignment.status = 'rejected';
        await assignment.save();
        res.json({ message: 'Assignment rejected' });
    } else {
        res.status(404).json({ message: 'Assignment not found' });
    }
};
