import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import ManagerDashboard from './components/Manager/ManagerDashboard';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';


function App() {
  const { userRole } = useSelector((state) => state.login);

  return (
    <Router> 
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Role-based Routing */}
          {userRole === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
          {userRole === 'manager' && <Route path="/manager" element={<ManagerDashboard />} />}

          {/* Redirect based on role */}
          <Route 
            path="*" 
            element={
              userRole === 'admin' ? (
                <Navigate to="/admin" />
              ) : userRole === 'manager' ? (
                <Navigate to="/manager" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;