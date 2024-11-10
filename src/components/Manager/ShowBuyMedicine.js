// src/components/Admin/ShowMedicineInfo.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { fetchMedicinesBuyData, updateMedicineData, deleteMedicineData, fetcSearchMedicibeData } from '../../utils/api';
import '../../styles/ShowSupplierInfo.css';//its same as medicine page that why use same css


const ShowMedicineInfo = () => {
  const [medicines, setMedicines] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedMedicine, setSelectedMedicine] = useState({
    medicineid: '',
    medicinename: '',
    medicinedesc: '',
    chategoryid: '',
    supplierid: '',
    createdDate: '' 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMedicinesBuyData();
        setMedicines(data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (medicine) => {
    setSelectedMedicine(medicine); // Load the selected medicine's data
    setShowEditModal(true); // Open edit modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedMedicine((prevMedicine) => ({
      ...prevMedicine,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateMedicineData(selectedMedicine); // Call the API to update the medicine data
      setMedicines((prevMedicines) =>
        prevMedicines.map((medicine) =>
          medicine.id === selectedMedicine.id ? selectedMedicine : medicine
        )
      );
      alert('Update successfully');
      setShowEditModal(false); // Close edit modal
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  const handleDeleteConfirmation = (medicine) => {
    setSelectedMedicine(medicine); // Set the selected medicine to be deleted
    setShowDeleteModal(true); // Open delete confirmation modal
  };

  const handleDelete = async () => {
    try {
      await deleteMedicineData(selectedMedicine.id); // Call the API to delete the medicine
      setMedicines((prevMedicines) =>
        prevMedicines.filter((medicine) => medicine.id !== selectedMedicine.id) // Remove medicine from state
      );
      alert('Medicine deleted successfully');
      setShowDeleteModal(false); // Close delete confirmation modal
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetcSearchMedicibeData(searchQuery);
      setMedicines(Array.isArray(response) ? response : []);  // Ensure response is an array
    } catch (error) {
      console.error('Error searching for user data:', error);
      setMedicines([]); // If error, reset the User list to an empty array
    }
  };


  // const formatDate = (dateString) => {
  //   const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  //   return new Date(dateString).toLocaleDateString('en-GB', options); // Formats to dd-MM-yyyy
  // };



  return (
    <div className="supplier-info-container">
      <h2>Medicine Information</h2>

{/* Search Field and Button */}
<div className="d-flex justify-content-center mt-0 mb-3">
<input 
          type="text" 
          className="form-control me-3"
          style={{ maxWidth: '300px' }} //css add here
          placeholder="Search by ID or Name" 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
        <button className="btn btn-secondary me-2"onClick={handleSearch}>Search</button>
</div>


      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SL NO</th>
            <th>Medicine ID</th>
            <th>Medicine Name</th>
            <th>Supply ID</th>
            <th>Supply Name</th>
            <th>Quantity</th>
            <th>Manufacture Date</th>  
            <th>Expare Date</th>
            <th>Entry Date</th>
            <th>Entry BY</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={medicine.id}>
              <td>{index + 1}</td>
              <td>{medicine.medicineid}</td>
              <td>{medicine.medicinename}</td>
              <td>{medicine.supplierid}</td>
              <td>{medicine.suppliername}</td>
              <td>{medicine.quantity}</td>
              <td>{medicine.makedate}</td>
              <td>{medicine.expairdate}</td>
              <td>{medicine.entryDate}</td>
              <td>{medicine.entryby}</td>

              {/* <td>{formatDate(medicine.createdDate)}</td> */}
              <td>
                <Button variant="warning" onClick={() => handleEdit(medicine)}>Edit</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteConfirmation(medicine)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for editing medicine */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Medicine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Medicine ID</Form.Label>
              <Form.Control
                type="text"
                name="medicineid"
                value={selectedMedicine.medicineid}
                onChange={handleInputChange}
                
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Medicine Name</Form.Label>
              <Form.Control
                type="text"
                name="medicinename"
                value={selectedMedicine.medicinename}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="medicinedesc"
                value={selectedMedicine.medicinedesc}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Chategory ID</Form.Label>
              <Form.Control
                type="text"
                name="chategoryid"
                value={selectedMedicine.chategoryid}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Supply ID</Form.Label>
              <Form.Control
                type="text"
                name="supplierid"
                value={selectedMedicine.supplierid}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Update</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Medicine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete <strong>{selectedMedicine.medicinename}</strong>?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button variant="danger" onClick={handleDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowMedicineInfo;
