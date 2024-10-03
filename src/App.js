import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Register from './users/Register';
import Login from './users/AdminLoginPanel';



function App() {
  return (

  <div className="App">
      <Router>

      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="register" element={<Register />} />
       
    
      </Routes>
      
      </Router>
    </div>
  );
}

export default App;