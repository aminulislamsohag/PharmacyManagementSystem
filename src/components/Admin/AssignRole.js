// src/components/Admin/AssignRole.js
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateUserRole, getUserRole } from '../../utils/api'; 
import '../../styles/AssignRole.css';

const AssignRole = () => {
  const [userId, setUserId] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [newRole, setNewRole] = useState('');
  const dispatch = useDispatch();

  const handleFetchRole = async () => {
    // Fetch current role based on userId or username
    try {
      const role = await getUserRole(userId); // Fetch API call to get user role
      setCurrentRole(role);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const handleUpdateRole = async () => {
    try {
      await updateUserRole(userId, newRole);
      alert('Role updated successfully');
      setUserId('');
      setCurrentRole('');
      setNewRole('');
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <div className="assign-role-form">
      <h2>Assign Role</h2>
      <Form>
        <Form.Group controlId="formUserId">
          <Form.Label>User ID or Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User ID or Username"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Form.Group>
        <Button variant="outline-primary" onClick={handleFetchRole}>
          Fetch Current Role
        </Button>
        
        {currentRole && (
          <>
            <Form.Group controlId="formCurrentRole">
              <Form.Label>Current Role</Form.Label>
              <Form.Control type="text" value={currentRole} disabled />
            </Form.Group>

            <Form.Group controlId="formNewRole">
              <Form.Label>New Role</Form.Label>
              <Form.Control
                as="select"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="">Select New Role</option>
                <option value="manager">Manager</option>
                <option value="assistant_manager">Assistant Manager</option>
                <option value="salesman">Salesman</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" onClick={handleUpdateRole}>
              Update Role
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default AssignRole;
