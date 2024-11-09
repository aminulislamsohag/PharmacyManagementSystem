import React, { useEffect, useState  } from 'react';
import { buyMedicine } from '../../utils/api';
import '../../styles/addMedicine.css';

const BuyMedicine = () => {
  const [medicineid, setMedicineid] = useState('');
  const [quantity, setQuantity] = useState('');
  const [makedate, setMakedate] = useState('');
  const [expairdate, setExpairdate] = useState('');
  const [entryby, setEntryby] = useState('');
 
  useEffect(() => {
    setEntryby(localStorage.getItem('username')) ;
  }, []);

 // console.log( entryby);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await buyMedicine(parseInt(medicineid),parseInt(quantity),makedate,expairdate,entryby);
      alert('Medicine added successfully');
      setMedicineid('');
      setQuantity('');
      setMakedate('');
      setExpairdate('');
      setEntryby('');
    } catch (error) {
      console.error('Error adding Medicine:', error);
    }
  };


  

  return (
    <div className="add-addmedicine-form">
      <form onSubmit={handleSubmit}>
        <label>
         Medicine ID:
          <input type="text" value={medicineid} onChange={(e) => setMedicineid(e.target.value)} required />
        </label>
        <label>
         Quantity:
          <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </label>
        <label>
        Make Date:
          <input type="date" value={makedate} onChange={(e) => setMakedate(e.target.value)} required />
        </label>
        <label>
        Expair date ID :
          <input type="date" value={expairdate} onChange={(e) => setExpairdate(e.target.value)} required />
        </label>
       
        <button type="submit">Add Medicine Quantity</button>
      </form>
    </div>
  );
};

export default BuyMedicine;
