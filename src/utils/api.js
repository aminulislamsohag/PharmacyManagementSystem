import axios from 'axios';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (username, password) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/resetPassword`, {
      username,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (userid, username, password, role) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/add`, {
      userid,
      username,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getUserRole = async (userid) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${userid}/role`);
    return response.data.role; // Assuming API returns the role as { role: "role_name" }
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
};


export const updateUserRole = async (userid, role) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/${userid}/role`, { role });
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};