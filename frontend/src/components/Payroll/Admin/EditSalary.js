import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/api_instance'; // Adjust the path as necessary
import { useParams, useNavigate } from 'react-router-dom';

const EditSalary = () => {
  const { employeeId, month } = useParams(); // Extract employeeId and month from params
  const navigate = useNavigate(); // Initialize useNavigate
  const [salaryData, setSalaryData] = useState({
    basic_salary: 0,
    allowances: 0,
    deductions: 0,
    net_salary: 0,
  });

  // Calculate Net Salary
  const calculateNetSalary = () => {
    const { basic_salary, allowances, deductions } = salaryData;
    return parseFloat(basic_salary) + parseFloat(allowances) - parseFloat(deductions);
  };

  useEffect(() => {
    // Fetch salary data based on employeeId and month
    const fetchSalaryData = async () => {
      try {
        const response = await axiosInstance.get(`/view-salary/${employeeId}/${month}`);
        setSalaryData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching salary data:', error);
      }
    };

    fetchSalaryData();
  }, [employeeId, month]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert string values to decimal (float)
    const updatedSalaryData = {
      employeeId,
      month,
      basic_salary: parseFloat(salaryData.basic_salary),
      allowances: parseFloat(salaryData.allowances),
      deductions: parseFloat(salaryData.deductions),
      net_salary: calculateNetSalary(), // Use the calculated net salary
    };
  
    console.log(updatedSalaryData); // Check if data is formatted correctly before submitting
  
    try {
      await axiosInstance.put(`/update-salary`, updatedSalaryData);
      navigate('/salaryManagement'); // Navigate after successful update
    } catch (error) {
      console.error('Error updating salary:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Basic Salary:
        <input
          type="number"
          name="basic_salary"
          value={salaryData.basic_salary}
          onChange={(e) => setSalaryData({ ...salaryData, basic_salary: e.target.value })}
          required
        />
      </label>
      <label>
        Allowances:
        <input
          type="number"
          name="allowances"
          value={salaryData.allowances}
          onChange={(e) => setSalaryData({ ...salaryData, allowances: e.target.value })}
          required
        />
      </label>
      <label>
        Deductions:
        <input
          type="number"
          name="deductions"
          value={salaryData.deductions}
          onChange={(e) => setSalaryData({ ...salaryData, deductions: e.target.value })}
          required
        />
      </label>
      <label>
        Net Salary:
        <input
           type="number"
           name="net_salary"
           value={calculateNetSalary()} // Automatically calculate net salary
           readOnly
        />
      </label>
      <button type="submit">Update Salary</button>
    </form>
  );
};

export default EditSalary;
