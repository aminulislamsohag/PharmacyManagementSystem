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
import BuyMedicine from './BuyMedicine';
import ShowBuyMedicineList from './ShowBuyMedicine';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [headerTitle, setHeaderTitle] = useState('Dashboard');

  const [activeSection, setActiveSection] = useState(null); // Tracks which section is expanded
  const showAddUserForm = useSelector((state) => state.user.showAddUserForm);
  const [showAssignRole, setShowAssignRole] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [showListMedicine, setShowListMedicine] = useState(false);
  const [showSupplierInfo, setShowSupplierInfo] = useState(false);
  const [showChategoryInfo, setShowChategoryInfo] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showReportScreen, setShowReportScreen] = useState(false);
  const [showBuyMedicine, setShowBuyMedicine] = useState(false);
  const [showBuyMedicineList, setShowBuyMedicineList] = useState(false);


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

  const toggleSection = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };

  const handleShowDashboard = () => {
    setHeaderTitle('Dashboard');
    resetAllStates();
  };

  const resetAllStates = () => {
    dispatch(setShowAddUserForm(false));
    setShowAssignRole(false);
    setShowAddCategory(false);
    setShowAddSupplier(false);
    setShowAddMedicine(false);
    setShowBuyMedicine(false);
    setShowReportScreen(false);

    setShowUserInfo(false);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowListMedicine(false);
    setShowBuyMedicineList(false);

  };

  const handleShowAddUser = () => {
    setHeaderTitle('Add User Form');
    resetAllStates();
     dispatch(setShowAddUserForm(true));
  };

  const handleShowAssignRole = () => {
    setHeaderTitle('Assign Role');
    resetAllStates();
    setShowAssignRole(true);
  };

  const handleShowAddCategory = () => {
    setHeaderTitle('Add Category');
    resetAllStates();
    setShowAddCategory(true);
  };

  const handleShowAddSupplier = () => {
    setHeaderTitle('Add Supplier');
    resetAllStates();
    setShowAddSupplier(true);
  };
  const handleShowAddMedicine = () => {
    setHeaderTitle('Add Mecinine');
    resetAllStates();
    setShowAddMedicine(true);
  };

  const handleShowMedicineList = () => {
    resetAllStates();
    setShowListMedicine(true);
   };
   const handleShowBuyMedicineList = () => {
    setHeaderTitle('List of Buy Medicine');
    resetAllStates();
    setShowBuyMedicineList(true);
   };
 

  const handleShowSupplierInfo = () => {
   setHeaderTitle('');
   resetAllStates();
    setShowSupplierInfo(true);
  };


  const handleShowChategoryInfo = () => {
    setHeaderTitle('');
    resetAllStates();
     setShowChategoryInfo(true);
   };

   const handleShowUserInfo = () => {
    setHeaderTitle('');
    resetAllStates();
     setShowUserInfo(true);
   };


   const handleShowReportSecreen = () => {
    setHeaderTitle('Report Screen');
    resetAllStates();
    setShowReportScreen(true);
  };

   const handleShowBuyMedicine = () => {
    setHeaderTitle('Buy Medicine Entry');
    resetAllStates();
    setShowBuyMedicine(true);
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
          <Nav.Link onClick={() => toggleSection('user')}>User</Nav.Link>
          <Collapse in={activeSection === 'user'}>
            <div className="user-options">
              <Nav.Link onClick={() => handleShowAddUser()}>Add User</Nav.Link>
              <Nav.Link onClick={() => handleShowAssignRole()}>Assign Role</Nav.Link>
            </div>
          </Collapse>
          <Nav.Link onClick={() => toggleSection('medicine')}>Medicine</Nav.Link>
          <Collapse in={activeSection === 'medicine'}>
            <div className="user-options">
              <Nav.Link onClick={() => handleShowAddCategory()}>Add Category</Nav.Link>
              <Nav.Link onClick={() => handleShowAddSupplier()}>Add Supplier</Nav.Link>
              <Nav.Link onClick={() => handleShowAddMedicine()}>Add Medicine</Nav.Link>
            </div>
          </Collapse>
          <Nav.Link onClick={() => toggleSection('inventory')}>Inventory</Nav.Link>
          <Collapse in={activeSection === 'inventory'}>
            <div className="user-options">
              <Nav.Link onClick={() => handleShowBuyMedicine()}>Buy Medicine</Nav.Link>
            </div>
          </Collapse>
          <Nav.Link onClick={() => toggleSection('report')}>Report</Nav.Link>
          <Collapse in={activeSection === 'report'}>
            <div className="user-options">
              <Nav.Link onClick={() => handleShowReportSecreen()}>Report Screen</Nav.Link>
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
        ) :showBuyMedicine ? (
          <BuyMedicine />       
        ) : showBuyMedicineList ? (
          <ShowBuyMedicineList />       
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
              <Button variant="outline-primary" onClick={handleShowBuyMedicineList}>Show Buy Medicine List</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
