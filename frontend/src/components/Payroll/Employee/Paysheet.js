import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/api_instance'; // Import your axios instance
import '../Employee/paysheet.css'; // Import CSS for styling

const EmployeeSalarySheet = ({ employeeId }) => {
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch salary data for the employee
  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await axiosInstance.get(`/view-salary/${employeeId}`);
        setSalaryData(response.data); // Set the fetched data
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        console.error('Error fetching salary data:', err);
        setError('Failed to fetch salary data. Please try again.');
        setLoading(false); // Stop loading on error
      }
    };

    fetchSalaryData();
  }, [employeeId]); // Re-run effect when employeeId changes
  console.log(salaryData)
  if (loading) {
    return <p>Loading salary data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="salary-sheet-container">
      <h2>Salary Sheet for Employee ID: {employeeId}</h2>
      {salaryData.length === 0 ? (
        <p>No salary data available for this employee.</p>
      ) : (
        <table className="salary-table">
          <thead>
            <tr>
              <th>Basic Salary</th>
              <th>Allowances</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Month</th>
            </tr>
          </thead>
          <tbody>
            {salaryData.map((salary, index) => (
              <tr key={index}>
                <td>{salary.basic_salary}</td>
                <td>{salary.allowances}</td>
                <td>{salary.deductions}</td>
                <td>{salary.net_salary}</td>
                <td>{salary.month}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeSalarySheet;
