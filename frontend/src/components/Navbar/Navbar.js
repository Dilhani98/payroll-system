import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <ul style={styles.ul}>
          <li style={styles.li}><Link to="/login" style={styles.link}>Login</Link></li>
          <li style={styles.li}><Link to="/signup" style={styles.link}>Sign Up</Link></li>
        </ul>
      </div>
      <div style={styles.right}>
        <ul style={styles.ul}>
          <li style={styles.li}><Link to="/" style={styles.link}>Home</Link></li>
          <li style={styles.li}><Link to="/payroll" style={styles.link}>Payroll</Link></li>
          <li style={styles.li}><Link to="/profile" style={styles.link}>Profile</Link></li>
          <li style={styles.li}><Link to="/salaryManagement" style={styles.link}>Salary Management</Link></li>
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#333',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between', // Space between left and right sections
    alignItems: 'center',
  },
  ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  li: {
    marginRight: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
  left: {
    display: 'flex',
  },
  right: {
    display: 'flex',
  }
};

export default Navbar;
