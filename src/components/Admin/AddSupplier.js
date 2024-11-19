import React, { useState } from 'react';
import { addSupplier } from '../../utils/api';
import '../../styles/addMedicine.css';

const AddChategory = () => {
  const [supplierid, setSupplierid] = useState('');
  const [suppliername, setSuppliername] = useState('');
  const [suppliercontract, setSuppliercontract] = useState('');
  const [supplieraddress, setSupplieraddress] = useState('');
  const [supplieremail, setSupplieremail] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSupplier(parseInt(supplierid),suppliername,suppliercontract,supplieraddress,supplieremail);
      alert('Supplier added successfully');
      setSupplierid('');
      setSuppliername('');
      setSuppliercontract('');
      setSupplieraddress('');
      setSupplieremail('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="add-addmedicine-form">
      <form onSubmit={handleSubmit}>
        <label>
         ID:
          <input type="text" value={supplierid} onChange={(e) => setSupplierid(e.target.value)} required />
        </label>
        <label>
         Name:
          <input type="text" value={suppliername} onChange={(e) => setSuppliername(e.target.value)} required />
        </label>
        <label>
        Contract Number:
          <input type="text" value={suppliercontract} onChange={(e) => setSuppliercontract(e.target.value)} required />
        </label>
        <label>
        Address :
          <input type="text" value={supplieraddress} onChange={(e) => setSupplieraddress(e.target.value)} required />
        </label>
        <label>
        Email :
          <input type="email" value={supplieremail} onChange={(e) => setSupplieremail(e.target.value)} required />
        </label>
       
        <button type="submit">Add Supplier</button>
      </form>
    </div>
  );
};

export default AddChategory;
