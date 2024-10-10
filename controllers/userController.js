const User = require('../models/userModel');
const Assignment = require('../models/assignmentModel');
const jwt = require('jsonwebtoken');
const { request } = require('express');

// User registration
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, password, role: 'user' });

    if (user) {
        res.status(201).json({ message: 'User registered successfully' });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// User login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

// Upload assignment
exports.uploadAssignment = async (req, res) => {
    const { task, adminId } = req.body;
    const username = adminId
    const admin = await User.findOne({ username });
    console.log(admin)
    if (admin  && (admin.role == 'admin'))
    {
        const assignment = new Assignment({
            userId: req.user._id,
            task,
            admin: admin._id,
        });
    
        await assignment.save();
        res.status(201).json({ message: 'Assignment uploaded successfully' });
    }
    else {
        if (admin) {
            res.status(401).json({message: 'User exists but Invalid Role'});
        }
        else {
            res.status(401).json({message: 'Admin doesnt exists but Invalid Role'});
        }
    }
    
};

// Fetch all admins
exports.getAdmins = async (req, res) => {
    console.log(req)
    const admins = await User.find({ role: 'admin' });
    res.json(admins);
};
