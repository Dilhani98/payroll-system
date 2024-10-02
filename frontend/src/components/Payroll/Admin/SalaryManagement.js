import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/api_instance'; // Import the axios instance
import './SalaryManagement.css'; // Import any necessary CSS

const SalaryManagement = () => {
  const [salaries, setSalaries] = useState([]); // State to hold list of salaries
  const [error, setError] = useState(''); // Error message state

  // Fetch salaries from the server
  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await axiosInstance.get('/view-all-salary'); // Endpoint to get all salaries
      setSalaries(response.data);
    } catch (error) {
      console.error('Error fetching salaries:', error);
      setError('Failed to fetch salaries. Please try again.');
    }
  };

  // Handle delete button click
  const handleDelete = async (id,month) => {
    try {
      await axiosInstance.delete(`/delete/${id}/${month}`); // API call to delete salary
      fetchSalaries(); // Refresh the salary list after deletion
    } catch (error) {
      console.error('Error deleting salary:', error);
      setError('Failed to delete salary. Please try again.');
    }
  };

  return (
    <div className="management-container">
      <h2>Salary Management</h2>
      {error && <p className="error-message">{error}</p>} {/* Error message */}
      <Link to="/add-salary" className="add-salary-btn">Add New Salary</Link>
      
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Basic Salary</th>
            <th>Allowances</th>
            <th>Deductions</th>
            <th>Net Salary</th>
            <th>Month</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary) => (
            <tr key={salary.id}>
              <td>{salary.employee_id}</td>
              <td>{salary.basic_salary}</td>
              <td>{salary.allowances}</td>
              <td>{salary.deductions}</td>
              <td>{salary.net_salary}</td>
              <td>{salary.month}</td>
              <td>
                {/* Update the link to include the month */}
                <Link to={`/edit-salary/${salary.employee_id}/${salary.month}`} className="edit-btn">Edit</Link>
                <button onClick={() => handleDelete(salary.employee_id, salary.month)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalaryManagement;
