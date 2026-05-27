const User = require('../models/User');


// ================= GET ALL USERS =================

const getEmployees = async (req, res) => {

    try {

        // GET ALL USERS EXCEPT PASSWORD
        const users = await User.find().select('-password');

        res.status(200).json(users);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Failed to fetch users'
        });

    }

};


// ================= ADD USER =================

const addEmployee = async (req, res) => {

    try {

        const {
            name,
            email,
            company,
            designation,
            role
        } = req.body;

        // VALIDATION
        if (!name || !email) {

            return res.status(400).json({
                message: 'Name and Email are required'
            });

        }

        // CHECK EXISTING USER
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: 'User already exists'
            });

        }

        // CREATE USER
        const user = await User.create({

            name,

            email,

            password: 'temp123',

            company: company || 'Not Assigned',

            designation: designation || 'Employee',

            role: role || 'General User',

            verified: false

        });

        res.status(201).json(user);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Failed to add user'
        });

    }

};


// ================= VERIFY USER =================

const verifyEmployee = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        user.verified = !user.verified;

        await user.save();

        res.status(200).json(user);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Failed to verify user'
        });

    }

};


// ================= DELETE USER =================

const deleteEmployee = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        await user.deleteOne();

        res.status(200).json({
            message: 'User Deleted Successfully'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Failed to delete user'
        });

    }

};


module.exports = {

    getEmployees,
    addEmployee,
    verifyEmployee,
    deleteEmployee

};