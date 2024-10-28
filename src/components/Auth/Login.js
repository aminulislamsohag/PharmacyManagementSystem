// src/components/Auth/Login.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { login, resetUserPassword, clearMessage } from '../../store/loginSlice';
import '../../styles/Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState({ username: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, userRole, loading } = useSelector((state) => state.login);

  // Modal handlers
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Handle login submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }))
      .unwrap()
      .then((role) => {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userRole', role);
        navigate(
          userRole === 'admin' 
            ? '/admin' 
            : userRole === 'manager' 
            ? '/manager' 
            : userRole === 'assistant_manager' 
            ? '/assistant-manager' 
            : '/salesman' // Default route for 'salesman' role
        );// Role-based redirection
      })
      .catch((err) => console.error(err));
  };

  // Handle password reset submit
  const handleResetPassword = () => {
    dispatch(resetUserPassword(newPassword))
      .unwrap()
      .then(() => {
        setNewPassword({ username: '', password: '' });
        handleCloseModal();
      })
      .catch((err) => console.error(err));
  };

  // Handle form changes
  const handleInputChange = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
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
            <a href="#" className="float-right" onClick={handleShowModal}>Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-2" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
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
              <Form.Label>Username</Form.Label>
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