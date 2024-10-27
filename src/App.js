import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import ManagerDashboard from './components/Manager/ManagerDashboard';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';



function App() {
    return (
        <Router> 
            <div>
            <Header />
           

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/manager" element={<ManagerDashboard />} />

        
            </Routes>
            
            <Footer/>
            </div>

        </Router>
    );
}

export default App;
