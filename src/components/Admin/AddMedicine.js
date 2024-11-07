import React, { useState } from 'react';
import { addMedicine } from '../../utils/api';
import '../../styles/addMedicine.css';

const AddChategory = () => {
  const [medicineid, setMedicineid] = useState('');
  const [medicinename, setMedicinename] = useState('');
  const [medicinedesc, setMedicinedesc] = useState('');
  const [chategoryid, setChategoryid] = useState('');
  const [supplierid, setSupplierid] = useState('');
 



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMedicine(parseInt(medicineid),medicinename,medicinedesc,chategoryid,supplierid);
      alert('Medicine added successfully');
      setMedicineid('');
      setMedicinename('');
      setMedicinedesc('');
      setChategoryid('');
      setSupplierid('');
    } catch (error) {
      console.error('Error adding Medicine:', error);
    }
  };


  

  return (
    <div className="add-addmedicine-form">
      <form onSubmit={handleSubmit}>
        <label>
         ID:
          <input type="text" value={medicineid} onChange={(e) => setMedicineid(e.target.value)} required />
        </label>
        <label>
         Name:
          <input type="text" value={medicinename} onChange={(e) => setMedicinename(e.target.value)} required />
        </label>
        <label>
        Description:
          <input type="text" value={medicinedesc} onChange={(e) => setMedicinedesc(e.target.value)} required />
        </label>
        <label>
        Chategory ID :
          <input type="text" value={chategoryid} onChange={(e) => setChategoryid(e.target.value)} required />
        </label>
        <label>
        Supplier ID :
          <input type="text" value={supplierid} onChange={(e) => setSupplierid(e.target.value)} required />
        </label>
       
        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddChategory;
