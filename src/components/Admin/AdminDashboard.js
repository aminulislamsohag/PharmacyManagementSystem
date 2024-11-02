// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Collapse, Nav, Navbar } from 'react-bootstrap';
import '../../styles/AdminDashboard.css';
import AddUser from './AddUser';
import AssignRole from './AssignRole';
import { setShowAddUserForm } from '../../store/userSlice';
import AddChategory from './AddCategory';
import AddSupply from './AddSupplier';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [headerTitle, setHeaderTitle] = useState('Dashboard');

  const [showUserOptions, setShowUserOptions] = useState(false);
  const showAddUserForm = useSelector((state) => state.user.showAddUserForm);
  const [showAssignRole, setShowAssignRole] = useState(false);

  const [showMedicineOptions, setShowMedicineOptions] = useState(false); // New state for Medicine submenu
  const [showAddChategory, setShowAddChategory] = useState(false);
  const [showAddSupplier, setShowAddSupplier] = useState(false);

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem('auth')) === true;
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('userRole');

    if (!isAuthenticated && storedRole == null) {
      navigate('/');
    } else if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleShowDashboard = () => {
    setHeaderTitle('Dashboard');
    setShowAssignRole(false);
    dispatch(setShowAddUserForm(false));
    setShowAddChategory(false);
    setShowAddSupplier(false);
  };

  const handleShowAddUser = () => {
    setHeaderTitle('Add User Form');
    setShowAssignRole(false);
    dispatch(setShowAddUserForm(true));
  };

  const handleShowAssignRole = () => {
    setHeaderTitle('Assign Role');
    dispatch(setShowAddUserForm(false));
    setShowAssignRole(true);
  };



  const handleShowAddCategory = () => {
    setHeaderTitle('Add Category');
    setShowAssignRole(false);
    dispatch(setShowAddUserForm(false));
    setShowAddChategory(true);
    setShowAddSupplier(false);
  };

  const handleShowAddSupplier = () => {
    setHeaderTitle('Add Supplier');
    setShowAssignRole(false);
    dispatch(setShowAddUserForm(false));
    setShowAddChategory(false);
    setShowAddSupplier(true);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Admin</h3>
          <p>{username}</p>
        </div>
        <Nav className="flex-column">
          <Nav.Link onClick={handleShowDashboard}>Dashboard</Nav.Link>
          <Nav.Link onClick={() => setShowUserOptions(!showUserOptions)}>
           User
          </Nav.Link>
          <Collapse in={showUserOptions}>
            <div className="user-options">
              <Nav.Link onClick={handleShowAddUser}>Add User</Nav.Link>
              <Nav.Link onClick={handleShowAssignRole}>Assign Role</Nav.Link>
            </div>
          </Collapse>
          <Nav.Link onClick={()=>setShowMedicineOptions(!showMedicineOptions)}>
            Medicine
            </Nav.Link>
          <Collapse in={showMedicineOptions}>
            <div className="user-options">
              <Nav.Link onClick={handleShowAddCategory}>Add Category</Nav.Link>
              <Nav.Link onClick={handleShowAddSupplier}>Add Supplier</Nav.Link>
            </div>
          </Collapse>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </div>

      <div className="main-content">
        <Navbar bg="light" className="justify-content-between">
          <Navbar.Brand>{headerTitle}</Navbar.Brand>
        </Navbar>

        {showAddUserForm ? (
          <AddUser />
        ) : showAssignRole ? (
          <AssignRole />
        ) :  showAddChategory ? (
          <AddChategory />
        ) : showAddSupplier ? (
          <AddSupply/>
        ) : 
        
        
        (
          <div>
            <div className="dashboard-stats">
              <div className="stat-card">Total Customers <span>5</span></div>
              <div className="stat-card">Total Suppliers <span>16</span></div>
              <div className="stat-card">Total Medicine <span>4</span></div>
              <div className="stat-card">Total Invoice <span>2</span></div>
              <div className="stat-card">Out of Stock <span>1</span></div>
              <div className="stat-card">Expired <span>0</span></div>
            </div>
            <div className="action-buttons">
              <Button variant="outline-primary" onClick={() => navigate('/admin/invoice')}>Create New Invoice</Button>
              <Button variant="outline-primary" onClick={() => navigate('/admin/customer')}>Add New Customer</Button>
              <Button variant="outline-primary" onClick={() => navigate('/admin/medicine')}>Add New Medicine</Button>
              <Button variant="outline-primary" onClick={() => navigate('/admin/supplier')}>Add New Supplier</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
