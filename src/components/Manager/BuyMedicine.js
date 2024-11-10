import React, { useEffect, useState  } from 'react';
import { buyMedicine } from '../../utils/api';
import '../../styles/addMedicine.css';
import moment from 'moment';

const BuyMedicine = () => {
  const [medicineid, setMedicineid] = useState('');
  const [quantity, setQuantity] = useState('');
  const [fmtemakedate, setFmtMakedate] = useState('');
  const [fmteexpairdate, setFmtExpairdate] = useState('');
  const [entryby, setEntryby] = useState('');
 
  useEffect(() => {
    setEntryby(localStorage.getItem('username')) ;
  }, []);
 // console.log( entryby);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format dates before sending
      // Convert date format if needed
      const makedate = moment(fmtemakedate).format('DD-MM-YYYY');
      const expairdate = moment(fmteexpairdate).format('DD-MM-YYYY');
    
    
      await buyMedicine(parseInt(medicineid),parseInt(quantity),makedate,expairdate,entryby);
      alert('Medicine added successfully');
      setMedicineid('');
      setQuantity('');
      setFmtMakedate('');
      setFmtExpairdate('');
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
          <input type="date" value={fmtemakedate} onChange={(e) => setFmtMakedate(e.target.value)} required />
        </label>
        <label>
        Expair date :
          <input type="date" value={fmteexpairdate} onChange={(e) => setFmtExpairdate(e.target.value)} required />
        </label>
       
        <button type="submit">Add Medicine Quantity</button>
      </form>
    </div>
  );
};

export default BuyMedicine;
