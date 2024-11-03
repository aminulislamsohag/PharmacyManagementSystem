import React, { useState } from 'react';
import { addChategory } from '../../utils/api';
import '../../styles/AddChategory.css';

const AddChategory = () => {
  const [chategoryid, setChategoryid] = useState('');
  const [chategoryname, setChategoryname] = useState('');
  const [chategorydesc, setChategorydesc] = useState('');
  const [location, SetLocation] = useState('');
  const [supplierid, setSupplierid] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addChategory(parseInt(chategoryid),chategoryname,chategorydesc,location,supplierid);
      alert('User added successfully');
      setChategoryid('');
      setChategoryname('');
      setChategorydesc('');
      SetLocation('');
      setSupplierid('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="add-addcategory-form">
      <form onSubmit={handleSubmit}>
        <label>
        Category ID:
          <input type="text" value={chategoryid} onChange={(e) => setChategoryid(e.target.value)} required />
        </label>
        <label>
        Category Name:
          <input type="text" value={chategoryname} onChange={(e) => setChategoryname(e.target.value)} required />
        </label>
        <label>
        Category Desc:
          <input type="text" value={chategorydesc} onChange={(e) => setChategorydesc(e.target.value)} required />
        </label>
        <label>
        Location:
          <input type="text" value={location} onChange={(e) => SetLocation(e.target.value)} required />
        </label>
        <label>
        Supplier ID:
          <input type="text" value={supplierid} onChange={(e) => setSupplierid(e.target.value)} required />
        </label>
       
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default AddChategory;
