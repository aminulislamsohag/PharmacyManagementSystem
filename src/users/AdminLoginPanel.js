import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/Login.css'; 

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  //mini windows declear
  const [showModal, setShowModal] = useState(false);
  //windows variable declear
  const [newPassword, setNewPassword] = useState({
    Username: '',
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
  const handleNewPassword = async () => {
    try {
      
       //patient data sent to API for save in database
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/newPassword`);//respose status code
      if (response.status === 201) { // assuming 201 is the success status
        const SetPassword = response.data;

        
        // Close the modal after successful addition
      handleCloseModal();
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };






  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        username,
        password
      });
      console.log('Login successful:', response.data);
      if(response.data===true)
      setMessage('Login successful');
      else
      setMessage('Login Failed');
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
          <Button variant="primary" onClick={handleNewPassword}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>






    </div>
  
  );
}
