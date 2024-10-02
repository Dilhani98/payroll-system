import React from 'react';
import EmployeeSalarySheet from '../Payroll/Employee/Paysheet'; // Import the salary sheet component

const EmployeeProfile = ({ employeeId }) => {
  return (
    <div>
      <h1>Employee Profile</h1>
      {/* Add other employee profile details here */}
      
      {/* View salary sheet */}
      <EmployeeSalarySheet employeeId={employeeId} />
    </div>
  );
};

export default EmployeeProfile;
