import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {

 

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/api/users/register', {
          username,
          password,
        });
        console.log('Registration successful:', response.data);
        setMessage('Registration successful');
      } catch (error) {
        console.error('Registration failed:', error);
        setMessage('Registration failed');
      }

}
    

  return (
    <div>
    <h2>Register</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
    {message && <p>{message}</p>}
  </div>
  )
}
