import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Header from './adminheader';

const BusForm = () => {
  const [formData, setFormData] = useState({
    ID: '',
    name: '',
    boarding: '',
    destination: '',
    boardingtime: '',
    droptime: '',
    price: '',
    noofseats: '',
    acornonac: '',
    seaterorsleeper: '',
    seatstatus: '',
    rating: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const paperStyle = { padding: 20, width: 500, margin: '20px auto' };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnStyle = { margin: '20px 0' };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await axios.post('http://localhost:3000/buses/', formData);
      console.log(response.data);
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Header></Header>
    <Grid container justifyContent="center">
      {!formSubmitted && (
        <Paper elevation={10} style={paperStyle}>
          <br />
          <Grid align="center">
            <Avatar style={avatarStyle}>🚌</Avatar>
            <br />
            <Typography variant="h5">Bus Details Form</Typography>
          </Grid>
          <br />
          <form onSubmit={handleFormSubmit}>
            <Grid item xs={12}>
              <TextField
                name="ID"
                label="ID"
                placeholder="Enter bus ID"
                fullWidth
                required
                value={formData.ID}
                onChange={handleFormChange}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                placeholder="Enter bus name"
                fullWidth
                required
                value={formData.name}
                onChange={handleFormChange}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                name="boarding"
                label="Boarding"
                placeholder="Enter boarding location"
                fullWidth
                required
                value={formData.boarding}
                onChange={handleFormChange}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                name="destination"
                label="Destination"
                placeholder="Enter destination"
                fullWidth
                required
                value={formData.destination}
                onChange={handleFormChange}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                name="boardingtime"
                label="Boarding Time"
                placeholder="Enter boarding time"
                fullWidth
                required
                value={formData.boardingtime}
                onChange={handleFormChange}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                name="droptime"
                label="Drop Time"
                placeholder="Enter drop time"
                fullWidth
                required
                value={formData.droptime}
                onChange={handleFormChange}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                name="price"
                label="Price"
                placeholder="Enter price"
                fullWidth
                required
                value={formData.price}
                onChange={handleFormChange}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                name="noofseats"
                label="Number of Seats"
                placeholder="Enter number of seats"
                fullWidth
                required
                value={formData.noofseats}
                onChange={handleFormChange}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                name="acornonac"
                label="AC or Non-AC"
                placeholder="Enter AC or non-AC"
                fullWidth
                required
                value={formData.acornonac}
                onChange={handleFormChange}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                name="seaterorsleeper"
                label="Seater or Sleeper"
                placeholder="Enter seater or sleeper"
                fullWidth
                required
                value={formData.seaterorsleeper}
                onChange={handleFormChange}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                name="seatstatus"
                label="Seat Status"
                placeholder="Enter seat status"
                fullWidth
                required
                value={formData.seatstatus}
                onChange={handleFormChange}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <TextField
                name="rating"
                label="Rating"
                placeholder="Enter rating"
                fullWidth
                required
                value={formData.rating}
                onChange={handleFormChange}
              />
            </Grid>
            <br/>
            <Grid item xs={12}>
              <TextField
                name="seatvacancy"
                label="Seats Available"
                placeholder="Enter seats available"
                fullWidth
                required
                value={formData.seatvacancy}
                onChange={handleFormChange}
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
                Submit
              </Button>
            </Grid>
          </form>
        </Paper>
      )}
      {formSubmitted && <Typography variant="h6">Form Submitted Successfully!</Typography>}
    </Grid>
    </div>
  );
};

export default BusForm;