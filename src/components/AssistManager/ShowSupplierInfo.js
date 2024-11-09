// src/components/Admin/ShowSupplierInfo.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { fetchSuppliersData, updateSupplierData } from '../../utils/api';
import '../../styles/ShowSupplierInfo.css';

const ShowSupplierInfo = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState({
    supplierid: '',
    suppliername: '',
    suppliercontract: '',
    supplieremail: '',
    supplieraddress: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSuppliersData();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier); // Load the selected supplier's data
    setShowEditModal(true); // Open edit modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSupplier((prevSupplier) => ({
      ...prevSupplier,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateSupplierData(selectedSupplier); // Call the API to update the supplier data
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) =>
          supplier.id === selectedSupplier.id ? selectedSupplier : supplier
        )
      );
      alert('Update successfully');
      setShowEditModal(false); // Close edit modal
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };


  return (
    <div className="supplier-info-container">
      <h2>Supplier Information</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SL NO</th>
            <th>Supplier ID</th>
            <th>Supplier Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={supplier.id}>
              <td>{index + 1}</td>
              <td>{supplier.supplierid}</td>
              <td>{supplier.suppliername}</td>
              <td>{supplier.suppliercontract}</td>
              <td>{supplier.supplieremail}</td>
              <td>{supplier.supplieraddress}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(supplier)}>Edit</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for editing supplier */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Supplier ID</Form.Label>
              <Form.Control
                type="text"
                name="supplierid"
                value={selectedSupplier.supplierid}
                onChange={handleInputChange}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Supplier Name</Form.Label>
              <Form.Control
                type="text"
                name="suppliername"
                value={selectedSupplier.suppliername}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="suppliercontract"
                value={selectedSupplier.suppliercontract}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="supplieremail"
                value={selectedSupplier.supplieremail}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="supplieraddress"
                value={selectedSupplier.supplieraddress}
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

export default ShowSupplierInfo;
