import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getUserRole, updateUserRole } from '../../utils/api'; 
import '../../styles/AssignRole.css';

const AssignRole = () => {
  const [username, setUsername] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [newRole, setNewRole] = useState('');
  const [error, setError] = useState('');
  const [roleFetched, setRoleFetched] = useState(false); // Track if role is fetched

  const handleFetchRole = async () => {
    try {
      setError('');
      const role = await getUserRole(username);  // Fetch user role by username
      setCurrentRole(role);  // Set the fetched role to display it
      setRoleFetched(true);  // Indicate that the role has been fetched
      console.log('Role response:', role);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setError('Failed to fetch user role. Please check the username.');
    }
  };

  const handleUpdateRole = async () => {
    try {
      setError('');
      if (!newRole) {
        setError('Please select a new role before updating.');
        return;
      }
      //const roleData = { role: newRole }; // Prepare the data to send
      //console.log('Role :', newRole);
      await updateUserRole(username, newRole);  // Update user role API call
      alert('Role updated successfully');
      setUsername('');
      setCurrentRole('');
      setNewRole('');
      setRoleFetched(false); // Reset role fetched state
    } catch (error) {
      console.error('Error updating user role:', error);
      setError('Failed to update role. Please try again.');
    }
  };

  return (
    <div className="assign-role-form">
      <h2>Assign Role</h2>
      {error && <p className="error-message">{error}</p>}
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        {!roleFetched ? (
          <Button variant="outline-primary" onClick={handleFetchRole}>
            Fetch Current Role
          </Button>
        ) : (
          <>
            <Form.Group controlId="formCurrentRole">
              <Form.Label>Current Role</Form.Label>
              <Form.Control type="text" value={currentRole} readOnly />
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
