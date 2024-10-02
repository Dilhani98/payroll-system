import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';  // Importing the Navbar
import SalaryForm from './components/Payroll/Admin/SalaryForm';
import EmployeeProfile from './components/Employee Profile/Profile';
import SalaryManagement from './components/Payroll/Admin/SalaryManagement';
import EditSalary from './components/Payroll/Admin/EditSalary';

function App() {
  return (
    <Router>
      <div>
        <Navbar />  {/* Add the Navbar at the top */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/payroll' element={<SalaryForm />} />
          <Route path='/profile' element={<EmployeeProfile employeeId={'1'} />} />
          <Route path='/salaryManagement' element={<SalaryManagement />} />
          <Route path="/edit-salary/:employeeId/:month" element={<EditSalary />} /> {/* Ensure this matches correctly */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
