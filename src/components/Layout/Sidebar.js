import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/admin">Admin Dashboard</Link></li>
        <li><Link to="/manager">Manager Dashboard</Link></li>
        <li><Link to="/assist-manager">Assist Manager Dashboard</Link></li>
        <li><Link to="/salesman">Salesman Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
