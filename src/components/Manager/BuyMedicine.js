import React, { useEffect, useState } from 'react';
import { buyMedicine, searchMedicine } from '../../utils/api'; // Import searchMedicine API function
import '../../styles/BuyMedicine.css';
import moment from 'moment';

const BuyMedicine = () => {
  const [medicineid, setMedicineid] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [fmtemakedate, setFmtMakedate] = useState('');
  const [fmteexpairdate, setFmtExpairdate] = useState('');
  const [entryby, setEntryby] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // For search input
  const [searchResults, setSearchResults] = useState([]); // To hold search results

  useEffect(() => {
    setEntryby(localStorage.getItem('username'));
  }, []);

  // Handle the medicine search
  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      try {
        const results = await searchMedicine(e.target.value); // Assume searchMedicine is an API function
        setSearchResults(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectMedicine = (medicine) => {
    setMedicineid(medicine.medicineid);
    setSearchTerm(medicine.medicinename);
    setSearchResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const makedate = moment(fmtemakedate).format('DD-MM-YYYY');
      const expairdate = moment(fmteexpairdate).format('DD-MM-YYYY');
      await buyMedicine(parseInt(medicineid), parseInt(quantity), parseInt(price), makedate, expairdate, entryby);
      alert('Medicine added successfully');
      setMedicineid('');
      setQuantity('');
      setPrice('');
      setFmtMakedate('');
      setFmtExpairdate('');
      setSearchTerm('');
    } catch (error) {
      console.error('Error adding Medicine:', error);
    }
  };

  return (
    <div className="add-addmedicine-form">
      <form onSubmit={handleSubmit}>
        
        <label>
          Search Medicine:
          <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by ID or name" />
        </label>

        {/* Enhanced search results with table headers */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <div className="search-results-header">
              <span className="column-header">Medicine ID</span>
              <span className="column-header">Name</span>
            </div>
            <ul>
              {searchResults.map((medicine) => (
                <li key={medicine.medicineid} onClick={() => handleSelectMedicine(medicine)} className="search-result-item">
                  <span className="medicine-id">{medicine.medicineid}</span>
                  <span className="medicine-name">{medicine.medicinename}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <label>
          Medicine ID:
          <input type="text" value={medicineid} onChange={(e) => setMedicineid(e.target.value)} required />
        </label>
        
        <label>
          Quantity:
          <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </label>
        
        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        
        <label>
          Make Date:
          <input type="date" value={fmtemakedate} onChange={(e) => setFmtMakedate(e.target.value)} required />
        </label>
        
        <label>
          Expiry Date:
          <input type="date" value={fmteexpairdate} onChange={(e) => setFmtExpairdate(e.target.value)} required />
        </label>
        
        <button type="submit">Add Medicine Quantity</button>
      </form>
    </div>
  );
};

export default BuyMedicine;
