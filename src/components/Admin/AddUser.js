import React, { useState } from 'react';
import { addUser } from '../../utils/api';
import '../../styles/addMedicine.css';

const AddUser = () => {
  const [userid, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser(parseInt(userid), username, password, role);
      alert('User added successfully');
      setUserId('');
      setUsername('');
      setPassword('');
      setRole('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="add-addmedicine-form">
      {/* <h2>Adding User</h2> */}
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input type="text" value={userid} onChange={(e) => setUserId(e.target.value)} required />
        </label>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="manager">Manager</option>
            <option value="assistant_manager">Assistant Manager</option>
            <option value="salesman">Salesman</option>
          </select>
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
