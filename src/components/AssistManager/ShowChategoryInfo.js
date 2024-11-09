// src/components/Admin/ShowChategoryInfo.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { fetchChategorysData, updateChategoryData } from '../../utils/api';
import '../../styles/ShowSupplierInfo.css';// its same as supplier page that why use same css




const ShowChategoryInfo = () => {
  const [Chategorys, setChategorys] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedChategory, setSelectedChategory] = useState({
    chategoryid: '',
    chategoryname: '',
    chategorydesc: '',
    location: '',
    supplierid: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChategorysData();
        setChategorys(data);
      } catch (error) {
        console.error('Error fetching Chategorys:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (Chategory) => {
    setSelectedChategory(Chategory); // Load the selected Chategory's data
    setShowEditModal(true); // Open edit modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedChategory((prevChategory) => ({
      ...prevChategory,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateChategoryData(selectedChategory); // Call the API to update the Chategory data
      setChategorys((prevChategorys) =>
        prevChategorys.map((Chategory) =>
          Chategory.id === selectedChategory.id ? selectedChategory : Chategory
        )
      );
      alert('Update successfully');
      setShowEditModal(false); // Close edit modal
    } catch (error) {
      console.error('Error updating Chategory:', error);
    }
  };

 
  

  return (
    <div className="supplier-info-container">
      <h2>Chategory Information</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SL NO</th>
            <th>Chategory ID</th>
            <th>Chategory Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Supplier ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Chategorys.map((Chategory, index) => (
            <tr key={Chategory.id}>
              <td>{index + 1}</td>
              <td>{Chategory.chategoryid}</td>
              <td>{Chategory.chategoryname}</td>
              <td>{Chategory.chategorydesc}</td>
              <td>{Chategory.location}</td>
              <td>{Chategory.supplierid}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(Chategory)}>Edit</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for editing Chategory */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Chategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="chategoryid"
                value={selectedChategory.chategoryid}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Name</Form.Label>
              <Form.Control
                type="text"
                name="chategoryname"
                value={selectedChategory.chategoryname}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Description</Form.Label>
              <Form.Control
                type="text"
                name="chategorydesc"
                value={selectedChategory.chategorydesc}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={selectedChategory.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Supplier ID</Form.Label>
              <Form.Control
                type="text"
                name="supplierid"
                value={selectedChategory.supplierid}
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

     
    </div>
  );
};

export default ShowChategoryInfo;
