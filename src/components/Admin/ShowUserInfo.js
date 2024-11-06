// src/components/Admin/ShowUserInfo.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { fetchUserData, deleteUserData, fetcSearchData} from '../../utils/api';
import '../../styles/ShowSupplierInfo.css';// same as supplier 
import { useNavigate } from 'react-router-dom';

const ShowUserInfo = () => {
  const [User, setUser] = useState([]);
  //const [showViewModal, setShowViewModal] = useState(false);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedUser, setSelectedUser] = useState({
    userid: '',
    username: '',
    role: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        setUser(data);
      } catch (error) {
        console.error('Error fetching User:', error);
      }
    };

    fetchData();
  }, []);

//   const handleView = (User) => {
//     setSelectedUser(User); // Load the selected User's data
//     setShowViewModal(true); // Open View modal
//   };


  const handleDeleteConfirmation = (User) => {
    setSelectedUser(User); // Set the selected User to be deleted
    setShowDeleteModal(true); // Open delete confirmation modal
  };

  const handleDelete = async () => {
    try {
      await deleteUserData(selectedUser.id); // Call the API to delete the User
      setUser((prevUser) =>
        prevUser.filter((User) => User.id !== selectedUser.id) // Remove User from state
      );
      alert('User deleted successfully');
      setShowDeleteModal(false); // Close delete confirmation modal
    } catch (error) {
      console.error('Error deleting User:', error);
    }
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetcSearchData(searchQuery);
      setUser(Array.isArray(response) ? response : []);  // Ensure response is an array
    } catch (error) {
      console.error('Error searching for user data:', error);
      setUser([]); // If error, reset the User list to an empty array
    }
  };


  return (
    <div className="supplier-info-container">
      <h2>User Information</h2>

 {/* Search Field and Button */}
 <div className="d-flex justify-content-center mt-0 mb-3">
<input 
          type="text" 
          className="form-control me-3"
          style={{ maxWidth: '300px' }} //css add here
          placeholder="Search by Name or ID" 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
        <button className="btn btn-secondary me-2"onClick={handleSearch}>Search</button>
</div>




      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SL NO</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {User.map((User, index) => (
            <tr key={User.id}>
              <td>{index + 1}</td>
              <td>{User.userid}</td>
              <td>{User.username}</td>
              <td>{User.role}</td>
              <td>
                <Button variant="warning" onClick={() => navigate('/admin/supplier')}>View</Button>{' '}
                <Button variant="danger" onClick={() => handleDeleteConfirmation(User)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      

     

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete <strong>{selectedUser.username}</strong>?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>No</Button>
          <Button variant="danger" onClick={handleDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowUserInfo;
