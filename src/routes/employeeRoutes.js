const express = require('express');
const router = express.Router();
const {
  registerEmployee,
  loginEmployee,
  getAllEmployees,
  getEmployee
} = require('../controllers/employeeController');
const { validateEmployee, validateLogin } = require('../validators/employeeValidator');

router.post('/register', validateEmployee, registerEmployee);
router.post('/login', validateLogin, loginEmployee);
router.get('/', getAllEmployees);
router.get('/:id', getEmployee);

module.exports = router;
