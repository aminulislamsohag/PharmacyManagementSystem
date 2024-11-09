// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Collapse, Nav, Navbar } from 'react-bootstrap';
import '../../styles/AdminDashboard.css';
import AddUser from './AddUser';
import AssignRole from './AssignRole';
import { setShowAddUserForm } from '../../store/userSlice';
import AddCategory from './AddCategory';
import AddSupply from './AddSupplier';
import AddMedicine from './AddMedicine';
import ListMedicine from './ListMedicine';
import ShowSupplierInfo from './ShowSupplierInfo';
import ShowChategoryInfo from './ShowChategoryInfo';
import ShowUserInfo from './ShowUserInfo';
import ReportScreen from './ReportScreen';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [headerTitle, setHeaderTitle] = useState('Dashboard');

  const [showUserOptions, setShowUserOptions] = useState(false);
  const showAddUserForm = useSelector((state) => state.user.showAddUserForm);
  const [showAssignRole, setShowAssignRole] = useState(false);
  const [showMedicineOptions, setShowMedicineOptions] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [showListMedicine, setShowListMedicine] = useState(false);
  const [showSupplierInfo, setShowSupplierInfo] = useState(false);
  const [showChategoryInfo, setShowChategoryInfo] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showReportOptions, setShowReportOptions] = useState(false);
  const [showReportScreen, setShowReportScreen] = useState(false);


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
    setShowAddCategory(false);
    setShowAddSupplier(false);
    setShowAddMedicine(false);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowUserInfo(false);
    setShowListMedicine(false);
    setShowReportScreen(false);


  };

  const handleShowAddUser = () => {
    setHeaderTitle('Add User Form');
    setShowAssignRole(false);
    dispatch(setShowAddUserForm(true));
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowUserInfo(false);
    setShowAddMedicine(false);
  };

  const handleShowAssignRole = () => {
    setHeaderTitle('Assign Role');
    dispatch(setShowAddUserForm(false));
    setShowAssignRole(true);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowUserInfo(false);
    setShowAddMedicine(false);
  };

  const handleShowAddCategory = () => {
    setHeaderTitle('Add Category');
    setShowAssignRole(false);
    dispatch(setShowAddUserForm(false));
    setShowAddCategory(true);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowUserInfo(false);
    setShowAddMedicine(false);
  };

  const handleShowAddSupplier = () => {
    setHeaderTitle('Add Supplier');
    setShowAssignRole(false);
    dispatch(setShowAddUserForm(false));
    setShowAddCategory(false);
    setShowAddSupplier(true);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowUserInfo(false);
    setShowAddMedicine(false);
  };
  const handleShowAddMedicine = () => {
    setHeaderTitle('Add Mecinine');
    setShowAssignRole(false);
    dispatch(setShowAddUserForm(false));
    setShowAddCategory(false);
    setShowAddSupplier(false);
    setShowAddMedicine(true);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowUserInfo(false);
  };

  const handleShowMedicineList = () => {
    setHeaderTitle('List of Medicine');
    setShowAssignRole(false);
    dispatch(setShowAddUserForm(false));
    setShowAddCategory(false);
    setShowAddSupplier(false);
    setShowAddMedicine(false);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowUserInfo(false);
    setShowListMedicine(true);
   };
 




  const handleShowSupplierInfo = () => {
   setHeaderTitle('');
    setShowAssignRole(false);
    dispatch(setShowAddUserForm(false));
    setShowAddCategory(false);
    setShowAddSupplier(false);
    setShowSupplierInfo(true);
    setShowChategoryInfo(false);
    setShowUserInfo(false);
    setShowAddMedicine(false);
  };


  const handleShowChategoryInfo = () => {
    setHeaderTitle('');
     setShowAssignRole(false);
     dispatch(setShowAddUserForm(false));
     setShowAddCategory(false);
     setShowAddSupplier(false);
     setShowSupplierInfo(false);
     setShowChategoryInfo(true);
     setShowUserInfo(false);
     setShowAddMedicine(false);
   };

   const handleShowUserInfo = () => {
    setHeaderTitle('');
     setShowAssignRole(false);
     dispatch(setShowAddUserForm(false));
     setShowAddCategory(false);
     setShowAddMedicine(false);
     setShowAddSupplier(false);
     setShowSupplierInfo(false);
     setShowChategoryInfo(false);
     setShowUserInfo(true);
   };


   const handleShowReportSecreen = () => {
    setHeaderTitle('All Report Screen');
    setShowAssignRole(false);
    dispatch(setShowAddUserForm(false));
    setShowAddCategory(false);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowUserInfo(false);
    setShowAddMedicine(false);
    setShowReportScreen(true);
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
          <Nav.Link onClick={() => setShowUserOptions(!showUserOptions)}>User</Nav.Link>
          <Collapse in={showUserOptions}>
            <div className="user-options">
              <Nav.Link onClick={handleShowAddUser}>Add User</Nav.Link>
              <Nav.Link onClick={handleShowAssignRole}>Assign Role</Nav.Link>
            </div>
          </Collapse>
          <Nav.Link onClick={() => setShowMedicineOptions(!showMedicineOptions)}>Medicine</Nav.Link>
          <Collapse in={showMedicineOptions}>
            <div className="user-options">
              <Nav.Link onClick={handleShowAddCategory}>Add Category</Nav.Link>
              <Nav.Link onClick={handleShowAddSupplier}>Add Supplier</Nav.Link>
              <Nav.Link onClick={handleShowAddMedicine}>Add Medicine</Nav.Link>
            </div>
          </Collapse>
          <Nav.Link onClick={() => setShowReportOptions(!showReportOptions)}>Report</Nav.Link>
          <Collapse in={showReportOptions}>
            <div className="user-options">
              <Nav.Link onClick={handleShowReportSecreen}>Report Screen</Nav.Link>
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
        ) : showAddCategory ? (
          <AddCategory />
        ) : showAddSupplier ? (
          <AddSupply />
        ) : showAddMedicine ? (
          <AddMedicine />       
        ) : showSupplierInfo ? (
          <ShowSupplierInfo />
        ) : showChategoryInfo ? (
          <ShowChategoryInfo />
        ) : showUserInfo ? (
          <ShowUserInfo />
        ) : showListMedicine ? (
          <ListMedicine />       
        ) : showReportScreen ? (
          <ReportScreen />       
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
              <Button variant="outline-primary" onClick={handleShowUserInfo}>Show User INFO</Button>
              <Button variant="outline-primary" onClick={handleShowSupplierInfo}>Show Supplier INFO</Button>
              <Button variant="outline-primary" onClick={handleShowChategoryInfo}>Show Category Info</Button>
              <Button variant="outline-primary" onClick={handleShowMedicineList}>Show Medicine List</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
