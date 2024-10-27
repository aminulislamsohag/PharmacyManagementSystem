import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Login.css'; 
import { Modal, Button, Form } from 'react-bootstrap';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  //mini windows declear
  const [showModal, setShowModal] = useState(false);
  //windows variable declear
  const [newPassword, setNewPassword] = useState({
    username: '',
    password: '',
   
  });


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  //handle changes in form input fields
  const handleInputChange = (e) => {setNewPassword
    ({
      ...newPassword,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
        username,
        password
      });

      if(response.data===0)
      setMessage('Login successful');
      else if(response.data===1)
      setMessage('User not found');
      else if(response.data===2)
        setMessage('Wrong password');
      else
      setMessage('Contract admin');

      localStorage.setItem('auth', 'true'); // Set auth flag in localStorage
      localStorage.setItem('username', username); // Store username
      navigate('/admin'); // Redirect to home page



    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Login failed:', error.response.data);
        setMessage('Invalid username or password');
      } else {
        console.error('Login failed:', error.message);
        setMessage('Login failed: ' + error.message);
      }
    }
  };



  const handleResetPassword = async () => {
    try {
      
       //patient data sent to API for save in database
       const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/resetPassword`,
        {
            username: newPassword.username,
            password: newPassword.password
        }
    );//respose status code
      if (response.status === 200) { // assuming 200 is the success status    
            setNewPassword({
              username: '',
              password: ''
            });
            handleCloseModal();
            setMessage('Password reset successfully!');
        } else {
            setMessage('Password reset failed.');
        }
    } catch (error) {

      if (error.response && error.response.status === 404) {
      // Specific message for 404 (user not found)
      handleCloseModal();
      setMessage('User not found');
    } else {
      // General error message for other errors
      setMessage('Error resetting password: ' + error.message);
    }
  }
  };








  return (

    <div className="login-container">
      <div className="login-card">
        <div className="text-center">
          <i className="fa fa-user-circle fa-5x"></i>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-user"></i></span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group mt-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-lock"></i></span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group form-check mt-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label mx-4" htmlFor="rememberMe">Remember me</label>
          
            <a href="#" className="float-right " onClick={handleShowModal} >Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-2">Login</button>
        </form>
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>





{/* Modal for Reset password */}
<Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Password Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={newPassword.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={newPassword.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleResetPassword}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>






    </div>
  
  );
}
