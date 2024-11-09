

// src/components/Admin/ManagerDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Collapse, Nav, Navbar } from 'react-bootstrap';
import '../../styles/AdminDashboard.css';
import AddCategory from '../Admin/AddCategory';
import AddSupply from '../Admin/AddSupplier';
import AddMedicine from '../Admin/AddMedicine';
import ListMedicine from '../Admin/ListMedicine';
import ShowSupplierInfo from '../Admin/ShowSupplierInfo';
import ShowChategoryInfo from '../Admin/ShowChategoryInfo';
import ReportScreen from '../Admin/ReportScreen';
import BuyMedicine from './BuyMedicine';


const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [headerTitle, setHeaderTitle] = useState('Dashboard');

  const [showMedicineOptions, setShowMedicineOptions] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSupplier, setShowAddSupplier] = useState(false);
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [showListMedicine, setShowListMedicine] = useState(false);
  const [showSupplierInfo, setShowSupplierInfo] = useState(false);
  const [showChategoryInfo, setShowChategoryInfo] = useState(false);
  const [showReportOptions, setShowReportOptions] = useState(false);
  const [showReportScreen, setShowReportScreen] = useState(false);
  const [showInventoryOptions, setShowInventoryOptions] = useState(false);
  const [showBuyMedicine, setShowBuyMedicine] = useState(false);


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
    setShowAddCategory(false);
    setShowAddSupplier(false);
    setShowAddMedicine(false);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowListMedicine(false);
    setShowReportScreen(false);
    setShowBuyMedicine(false);



  };





  const handleShowAddCategory = () => {
    setHeaderTitle('Add Category');
    setShowAddCategory(true);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowAddMedicine(false);
  };

  const handleShowAddSupplier = () => {
    setHeaderTitle('Add Supplier');
    setShowAddCategory(false);
    setShowAddSupplier(true);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowAddMedicine(false);
  };
  const handleShowAddMedicine = () => {
    setHeaderTitle('Add Mecinine');
    setShowAddCategory(false);
    setShowAddSupplier(false);
    setShowAddMedicine(true);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
  };

  const handleShowMedicineList = () => {
    setHeaderTitle('List of Medicine');
    setShowAddCategory(false);
    setShowAddSupplier(false);
    setShowAddMedicine(false);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowListMedicine(true);
   };
 




  const handleShowSupplierInfo = () => {
   setHeaderTitle('');
    setShowAddCategory(false);
    setShowAddSupplier(false);
    setShowSupplierInfo(true);
    setShowChategoryInfo(false);
    setShowAddMedicine(false);
  };


  const handleShowChategoryInfo = () => {
    setHeaderTitle('');
     setShowAddCategory(false);
     setShowAddSupplier(false);
     setShowSupplierInfo(false);
     setShowChategoryInfo(true);
     setShowAddMedicine(false);
   };



   const handleShowReportSecreen = () => {
    setHeaderTitle('All Report Screen');
    setShowAddCategory(false);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowAddMedicine(false);
    setShowReportScreen(true);
  };
  const handleShowBuyMedicine = () => {
    setHeaderTitle('Buy Medicine Entry');
    setShowBuyMedicine(true);
    setShowSupplierInfo(false);
    setShowChategoryInfo(false);
    setShowAddMedicine(false);
  };
 


  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Manager</h3>
          <p>{username}</p>
        </div>
        <Nav className="flex-column">
          <Nav.Link onClick={handleShowDashboard}>Dashboard</Nav.Link>
         
          <Nav.Link onClick={() => setShowMedicineOptions(!showMedicineOptions)}>Medicine</Nav.Link>
          <Collapse in={showMedicineOptions}>
            <div className="user-options">
              <Nav.Link onClick={handleShowAddCategory}>Add Category</Nav.Link>
              <Nav.Link onClick={handleShowAddSupplier}>Add Supplier</Nav.Link>
              <Nav.Link onClick={handleShowAddMedicine}>Add Medicine</Nav.Link>
            </div>
          </Collapse>
          <Nav.Link onClick={() => setShowInventoryOptions(!showInventoryOptions)}>Inventory</Nav.Link>
          <Collapse in={showInventoryOptions}>
            <div className="user-options">
              <Nav.Link onClick={handleShowBuyMedicine}>Buy Medicine</Nav.Link>

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

        {showAddCategory ? (
          <AddCategory />
        ) : showAddSupplier ? (
          <AddSupply />
        ) : showAddMedicine ? (
          <AddMedicine />       
        ) :showBuyMedicine ? (
          <BuyMedicine />       
        ) : showSupplierInfo ? (
          <ShowSupplierInfo />
        ) : showChategoryInfo ? (
          <ShowChategoryInfo />
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

export default ManagerDashboard;

