const express = require('express');

const router = express.Router();

const {
  getEmployees,
  addEmployee,
  verifyEmployee,
  deleteEmployee
} = require('../controllers/employeeController');


// GET ALL EMPLOYEES
router.get('/', getEmployees);


// ADD EMPLOYEE
router.post('/', addEmployee);


// VERIFY EMPLOYEE
router.put('/verify/:id', verifyEmployee);


// DELETE EMPLOYEE
router.delete('/:id', deleteEmployee);


module.exports = router;