// controllers/salaryController.js
const db = require('../config/db');

// Add salary for an employee
exports.addSalary = (req, res) => {
  const { employeeId, basicSalary, allowances, deductions, netSalary, month } = req.body;

  const sql = `INSERT INTO salaries (employee_id, basic_salary, allowances, deductions, net_salary,month) 
               VALUES (?, ?, ?, ?, ?,?)`;

  db.query(sql, [employeeId, basicSalary, allowances, deductions, netSalary, month], (err, result) => {
    if (err) {
      console.error('Error inserting salary:', err);
      return res.status(500).send('Error adding salary.');
    }
    res.status(201).send('Salary added successfully!');
  });
};


exports.viewSalary = (req, res) => {
  const employeeId = req.params.employee_id; // Access the employee ID from the route parameters
  if (!employeeId) {
    return res.status(400).send('Employee ID is required');
  }

  // Use a placeholder `?` and pass `employeeId` to prevent SQL injection
  const sql = `SELECT * FROM salaries WHERE employee_id = ?`;

  db.query(sql, [employeeId], (err, result) => {
    if (err) {
      console.error('Error fetching salary details:', err);
      return res.status(500).send('Error fetching salary details.');
    }

    // Check if result is found
    if (result.length === 0) {
      return res.status(404).send('No salary details found for the given employee ID.');
    }

    // Send the result back as a response
    res.status(200).json(result);
  });
};


exports.updateSalary = (req, res) => {
  const { employeeId, basic_salary, allowances, deductions, net_salary, month } = req.body; // Removed netSalary as it can be calculated


  // Update SQL query
  const sql = `UPDATE salaries 
               SET basic_salary = ?, allowances = ?, deductions = ?, net_salary = ? 
               WHERE employee_id = ? AND month = ?`;

  // Pass parameters as a single array
  db.query(sql, [basic_salary, allowances, deductions, net_salary, employeeId, month], (err, result) => {
    if (err) {
      console.error('Error updating salary:', err);
      return res.status(500).send('Error updating salary.');
    }

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).send('No salary details found for the given employee ID and month.');
    }

    res.status(200).send('Salary updated successfully!');
  });
};




exports.viewAllSalary = (req, res) => {


  // Use a placeholder `?` and pass `employeeId` to prevent SQL injection
  const sql = `SELECT * FROM salaries `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching salary details:', err);
      return res.status(500).send('Error fetching salary details.');
    }

    // Check if result is found
    if (result.length === 0) {
      return res.status(404).send('No salary details found for the given employee ID.');
    }

    // Send the result back as a response
    res.status(200).json(result);
  });
};

exports.deleteSalary = (req, res) => {
  const employeeId = req.params.employee_id;
  const month = req.params.month;

  const sqlDelete = "DELETE FROM salaries WHERE employee_id = ? AND month = ?";
  db.query(sqlDelete, [employeeId, month], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to delete salary record' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No salary record found for the given employee and month' });
    }

    return res.status(200).json({ message: 'Salary record deleted successfully' });
  });
};



exports.viewSalaryBasedOnMonth = (req, res) => {
  const employeeId = req.params.employee_id; // Access the employee ID from the route parameters
  const month = req.params.month;
  if (!employeeId) {
    return res.status(400).send('Employee ID is required');
  }

  // Use a placeholder `?` and pass `employeeId` to prevent SQL injection
  const sql = `SELECT * FROM salaries WHERE employee_id = ? and month = ?`;

  db.query(sql, [employeeId, month], (err, result) => {
    if (err) {
      console.error('Error fetching salary details:', err);
      return res.status(500).send('Error fetching salary details.');
    }

    // Check if result is found
    if (result.length === 0) {
      return res.status(404).send('No salary details found for the given employee ID.');
    }

    // Send the result back as a response
    res.status(200).json(result);
  });
};