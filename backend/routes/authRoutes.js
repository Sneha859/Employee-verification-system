const express = require('express');

const router = express.Router();

const {

    registerUser,
    loginUser,
    getAllUsers,
    verifyUser,
    deleteUser

} = require('../controllers/authController');



// REGISTER
router.post('/register', registerUser);



// LOGIN
router.post('/login', loginUser);



// GET ALL USERS
router.get('/users', getAllUsers);



// VERIFY USER
router.put('/verify/:id', verifyUser);



// DELETE USER
router.delete('/delete/:id', deleteUser);



module.exports = router;