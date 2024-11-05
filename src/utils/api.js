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


export const getUserRole = async (username) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/${username}/role`);
  if (!response.ok) {
    throw new Error('Failed to fetch role');
  }
  const role = await response.text(); // Assuming the response is just the role as a string
  return role;
};



export const updateUserRole = async (username, newRole) => {
  try {
    console.log('RoleData :', newRole);
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/${username}/role`, {newRole});
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};


export const addChategory = async (chategoryid,chategoryname,chategorydesc,location,supplierid) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/medicine/chategory`, {
      chategoryid,
      chategoryname,
      chategorydesc,
      location,
      supplierid
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const addSupplier = async (supplierid,suppliername,suppliercontract,supplieraddress,supplieremail) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/medicine/supplier`, {
      supplierid,
      suppliername,
      suppliercontract,
      supplieraddress,
      supplieremail
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const fetchSuppliersData = async () => {
  const response = await fetch('http://localhost:8080/medicine/suppliers');
  if (!response.ok) throw new Error('Failed to fetch suppliers');
  return await response.json();
};


export const updateSupplierData = async (supplier) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/medicine/editsupplier/${supplier.id}`, {
      supplierid:supplier.supplierid,
      suppliername: supplier.suppliername,
      suppliercontract: supplier.suppliercontract,
      supplieraddress: supplier.supplieraddress,
      supplieremail: supplier.supplieremail,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating supplier:', error);
    throw error;
  }
};


export const deleteSupplierData = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/medicine/deletesupplier/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};