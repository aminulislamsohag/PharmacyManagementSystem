import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import ManagerDashboard from './components/Manager/ManagerDashboard';
import AssistManagerDashboard from './components/AssistManager/AssistManagerDashboard';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';


function App() {
  const { userRole } = useSelector((state) => state.login);

  return (
    <Router> 
      <div className="app-container">
        <Header />
        {/* Scrollable main content area */}
        <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Role-based Routing */}
          {userRole === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
          {userRole === 'manager' && <Route path="/manager" element={<ManagerDashboard />} />}
          {userRole === 'assistmanager' && <Route path="/assistmanager" element={<AssistManagerDashboard />} />}

          {/* Redirect based on role */}
          <Route 
            path="*" 
            element={
              userRole === 'admin' ? (
                <Navigate to="/admin" />
              ) : userRole === 'manager' ? (
                <Navigate to="/manager" />
              ) : userRole === 'assistmanager' ? (
                <Navigate to="/assistmanager" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;