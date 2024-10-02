import React, { useState } from 'react';
import axiosInstance from '../../api/api_instance'; // Import the axios instance
import './SalaryForm.css'; // Import the CSS file

const SalaryForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    employeeId: 0,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    netSalary: 0,
    month: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [error, setError] = useState(''); // Error message state

  // Update form data on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Calculate Net Salary
  const calculateNetSalary = () => {
    const { basicSalary, allowances, deductions } = formData;
    return parseFloat(basicSalary) + parseFloat(allowances) - parseFloat(deductions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    setError(''); // Clear previous error message

    const calculatedNetSalary = calculateNetSalary();

    // Post data to the server
    try {
      const response = await axiosInstance.post('/add-salary', {
        ...formData,
        netSalary: calculatedNetSalary, // Send the calculated net salary
      });

      // Reset form data after successful submission
      setFormData({
        employeeId: 0,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        netSalary: 0,
        month:''
      });

      // Show success modal
      setIsModalOpen(true);

    } catch (error) {
      console.error('Error adding salary:', error);
      setError('Failed to add salary. Please try again.');
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="form-container">
      <h2>Add Employee Salary</h2>
      <form className="salary-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Basic Salary:</label>
          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Allowances:</label>
          <input
            type="number"
            name="allowances"
            value={formData.allowances}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Deductions:</label>
          <input
            type="number"
            name="deductions"
            value={formData.deductions}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Net Salary (Auto-calculated):</label>
          <input
            type="number"
            name="netSalary"
            value={calculateNetSalary()} // Automatically calculate net salary
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Month:</label>
          <input
            type="text"
            name="month"
            value={formData.month}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {error && <p className="error-message">{error}</p>} {/* Error message */}

      {/* Success Popup Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>Salary added successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryForm;
