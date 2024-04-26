import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AdminHeader from './adminheader';

const Busedit = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({
    busID: '',
    name: '',
    boarding: '',
    destination: '',
    boardingtime: '',
    droptime: '',
    price: '',
    noofseats:'',
    acornonac:'',
    seaterorsleeper:'',
    seatstatus:'',
    rating:'',
    seatvacancy:'',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/buses/');
        setBuses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bus data:', error);
      }
    };

    fetchBusData();
  }, []);

  const handleEdit = async (busID) => {
    try {
      const response = await axios.get(`http://localhost:3000/buses/${busID}`);
      const { _id, name,boarding,destination,boardingtime,droptime,price,noofseats,acornonac,seaterorsleeper,seatstatus,rating,seatvacancy } = response.data;
      setEditData({
        busID: _id,
        name,
        boarding,
        destination,
        boardingtime,
        droptime,
        price,
        noofseats,
        acornonac,
        seaterorsleeper,
        seatstatus,
        rating,
        seatvacancy,
      });
      setIsEditing(true);
    } catch (error) {
      console.error('Error fetching bus for edit:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/buses/${editData.busID}`, editData);
      setBuses((prevBuses) =>
        prevBuses.map((bus) =>
          bus._id === editData.busID
            ? { ...bus, ...editData }
            : bus
        )
      );
      setIsEditing(false);
      console.log(`Updated bus with ID: ${editData.busID}`);
    } catch (error) {
      console.error('Error updating bus:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDelete = async (busID) => {
    try {
      await axios.delete(`http://localhost:3000/buses/${busID}`);
      setBuses((prevBuses) => prevBuses.filter((bus) => bus._id !== busID));
      console.log(`Deleted bus with ID: ${busID}`);
    } catch (error) {
      console.error('Error deleting bus:', error);
    }
  };

  const filteredBuses = buses.filter((bus) =>
    bus.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AdminHeader></AdminHeader>
      <Container>
        <h2>Bus Details</h2>
        <SearchBar
          placeholder="Search by bus name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <BusCards>
            {filteredBuses.map((bus) => (
              <BusCard key={bus._id}>
                <h3>{bus.name}</h3>
                <p><strong>{bus.acSeater ? 'AC Seater' : 'Non-AC Seater'}</strong></p>
                <p><strong>Rating:</strong> {bus.rating}</p>
                <p><strong>{bus.boarding} - {bus.destination}</strong></p>
                <p><strong>Time:</strong> {bus.boardingtime} to {bus.droptime}</p>
                {bus.liveTracking && <p>Live Tracking</p>}
                <p><strong>Price:</strong> ₹{bus.price}</p>
                <div className="actions">
                  <EditButton onClick={() => handleEdit(bus._id)}>Edit</EditButton>
                  <DeleteButton onClick={() => handleDelete(bus._id)}>Delete</DeleteButton>
                </div>
              </BusCard>
            ))}
          </BusCards>
        )}

        {isEditing && (
          <EditForm>
            <h2>Edit Bus</h2>
            <form>
              {/* Edit form inputs */}
            </form>
          </EditForm>
        )}
      </Container>
    </div>
  );
};

export default Busedit;

const Container = styled.div`
  margin: 20px;
`;

const BusCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const BusCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  width: calc(33.33% - 20px);
  box-sizing: border-box;
  background-color: #f9f9f9;
`;

const EditButton = styled.button`
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
`;

const EditForm = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
`;

const UpdateButton = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 4px;
`;

const SearchBar = styled.input`
  padding: 8px;
  margin-bottom: 20px;
  width: 20%;
  box-sizing: border-box;
`;