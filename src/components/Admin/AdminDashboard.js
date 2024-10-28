// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Collapse, Nav, Navbar } from 'react-bootstrap';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [showUserOptions, setShowUserOptions] = useState(false);

  useEffect(() => {
    // Retrieve authentication status from localStorage
    const isAuthenticated = JSON.parse(localStorage.getItem('auth')) === true; // Using JSON.parse to ensure consistency
    const storedUsername = localStorage.getItem('username');

    // Debugging log to check the value of isAuthenticated
    console.log('Is Authenticated:', isAuthenticated);

    if (!isAuthenticated) {
      navigate('/'); // Redirect to login if not authenticated
    } else if (storedUsername) {
      setUsername(storedUsername); // Set username if available
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage on logout
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Admin</h3>
          <p>{username}</p>
        </div>
        <Nav className="flex-column">
          <Nav.Link onClick={() => navigate('/admin')}>Dashboard</Nav.Link>
          <Nav.Link onClick={() => setShowUserOptions(!showUserOptions)}>
            User
          </Nav.Link>
          <Collapse in={showUserOptions}>
            <div className="user-options">
              <Nav.Link onClick={() => navigate('/admin/add-user')}>Add User</Nav.Link>
              <Nav.Link onClick={() => navigate('/admin/assign-role')}>Assign Role</Nav.Link>
              <Nav.Link onClick={() => navigate('/admin/assign-menu')}>Assign Menu</Nav.Link>
            </div>
          </Collapse>
          <Nav.Link onClick={() => navigate('/admin/medicine')}>Medicine</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </div>
      <div className="main-content">
        <Navbar bg="light" className="justify-content-between">
          <Navbar.Brand>Admin Dashboard</Navbar.Brand>
        </Navbar>

        {/* Dashboard Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">Total Customers <span>5</span></div>
          <div className="stat-card">Total Suppliers <span>16</span></div>
          <div className="stat-card">Total Medicine <span>4</span></div>
          <div className="stat-card">Total Invoice <span>2</span></div>
          <div className="stat-card">Out of Stock <span>1</span></div>
          <div className="stat-card">Expired <span>0</span></div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Button variant="outline-primary" onClick={() => navigate('/admin/invoice')}>Create New Invoice</Button>
          <Button variant="outline-primary" onClick={() => navigate('/admin/customer')}>Add New Customer</Button>
          <Button variant="outline-primary" onClick={() => navigate('/admin/medicine')}>Add New Medicine</Button>
          <Button variant="outline-primary" onClick={() => navigate('/admin/supplier')}>Add New Supplier</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
