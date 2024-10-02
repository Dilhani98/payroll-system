const express = require('express');
const router = express.Router();
const salaryController = require('../controller/salarycontrollers');

router.post('/add-salary', salaryController.addSalary);

// Correct dynamic route parameter syntax
router.get('/view-salary/:employee_id', salaryController.viewSalary); // Correct route definition
router.put('/update-salary', salaryController.updateSalary);
router.get('/view-all-salary', salaryController.viewAllSalary)
router.delete('/delete/:employee_id/:month', salaryController.deleteSalary)
router.get('/view-salary/:employee_id/:month', salaryController.viewSalaryBasedOnMonth)
module.exports = router;
