const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');



// ================= REGISTER USER =================

const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;

        // CHECK EXISTING USER
        const userExists = await User.findOne({ email });

        if (userExists) {

            return res.status(400).json({
                message: 'User already exists'
            });

        }

        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // CREATE USER
        const user = await User.create({

            name,
            email,
            password: hashedPassword,
            role,
            verified: false

        });

        res.status(201).json({

            message: 'User Registered Successfully',

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                company: user.company,
                designation: user.designation,
                verified: user.verified

            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });

    }

};



// ================= LOGIN USER =================

const loginUser = async (req, res) => {

    try {

        const {
            email,
            password,
            role
        } = req.body;

        // CHECK USER
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: 'User not found'
            });

        }

        // CHECK PASSWORD
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: 'Invalid Password'
            });

        }

        // CHECK ROLE
        if (user.role !== role) {

            return res.status(400).json({
                message: 'Invalid Role Selected'
            });

        }

        // GENERATE TOKEN
        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: '7d'
            }

        );

        res.status(200).json({

            message: 'Login Successful',

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                company: user.company,
                designation: user.designation,
                verified: user.verified

            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });

    }

};



// ================= GET ALL USERS =================

// ================= GET ALL USERS =================

const getAllUsers = async (req, res) => {

    try {

        // FETCH USERS
        const users = await User.find()
            .select('-password');

        // DELAY RESPONSE
        setTimeout(() => {

            res.status(200).json(users);

        }, 2500);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Failed to fetch users'
        });

    }

};



// ================= VERIFY USER =================

const verifyUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        // TOGGLE VERIFY STATUS
        user.verified = !user.verified;

        await user.save();

        res.status(200).json({

            message: 'User Verification Updated',

            user

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Verification Failed'
        });

    }

};



// ================= DELETE USER =================

// ================= DELETE USER =================

const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: 'User not found'
            });

        }

        await user.deleteOne();

        res.status(200).json({
            message: 'User deleted successfully'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Delete Failed'
        });

    }

};



module.exports = {

    registerUser,
    loginUser,
    getAllUsers,
    verifyUser,
    deleteUser

};