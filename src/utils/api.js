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


export const addMedicine = async (medicineid,medicinename,medicinedesc,chategoryid,supplierid) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/medicine/addmedicine`, {
      medicineid,
      medicinename,
      medicinedesc,
      chategoryid,
      supplierid
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchMedicinesData = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/medicine/listmedicine`);
  if (!response.ok) throw new Error('Failed to fetch suppliers');
  return await response.json();
};


export const updateMedicineData = async (medicine) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/medicine/editmedicine/${medicine.id}`, {
      medicineid:medicine.medicineid,
      medicinename: medicine.medicinename,
      medicinedesc: medicine.medicinedesc,
      chategoryid: medicine.chategoryid,
      supplierid: medicine.supplierid,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating medicine:', error);
    throw error;
  }
};


export const deleteMedicineData = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/medicine/deletemedicine/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetcSearchMedicibeData = async (searchQuery) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/medicine/search?query=${searchQuery}`);
  if (!response.ok) throw new Error('Failed to fetch suppliers');
  return await response.json();
};




export const fetchSuppliersData = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/medicine/suppliers`);
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




export const fetchChategorysData = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/medicine/chategorys`);
  if (!response.ok) throw new Error('Failed to fetch suppliers');
  return await response.json();
};


export const updateChategoryData = async (chategory) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/medicine/editchategory/${chategory.id}`, {
      chategoryid:chategory.chategoryid,
      chategoryname: chategory.chategoryname,
      chategorydesc: chategory.chategorydesc,
      location: chategory.location,
      supplierid: chategory.supplierid,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating Chategory:', error);
    throw error;
  }
};


export const deleteChategoryData = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/medicine/deletechategory/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const fetchUserData = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/alluser`);
  if (!response.ok) throw new Error('Failed to fetch suppliers');
  return await response.json();
};

export const deleteUserData = async (id) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/user/deleteuser/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetcSearchData = async (searchQuery) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/search?query=${searchQuery}`);
  if (!response.ok) throw new Error('Failed to fetch suppliers');
  return await response.json();
};

// Buy medicine

export const buyMedicine = async (medicineid,quantity,makedate,expairdate,entryby) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/buymedicine/add`, {
      medicineid,
      quantity,
      makedate,
      expairdate,
      entryby
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};