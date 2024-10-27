// src/components/Admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth'); // colleet auth flag
    const storedUsername = localStorage.getItem('username'); // collect user name from previous storage

    if (!isAuthenticated) {
      navigate('/'); // Redirect to login if not authenticated
    } else {
      setUsername(storedUsername); // Set the username from localStorage
    }
  }, [navigate]);




  //logout this id and back to login page
  const handleLogout = () => {
    localStorage.removeItem('auth'); // Remove auth flag from localStorage
    localStorage.removeItem('username'); // Remove username from localStorage
    navigate('/'); // Redirect to login page
  };




  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
      </div>

      <button onClick={() => navigate('/admin/register-employee')}>Register Employee</button>
      {/* Other admin functionalities */}
    </div>
  );
};

export default AdminDashboard;
