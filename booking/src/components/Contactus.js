import React, { useState } from 'react';
import axios from 'axios';
import Userheader from './userheader';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Container,
  Box,
  Snackbar,
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import Header from './Header';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: '',
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Replace 'http://localhost:3000/contactus' with the actual endpoint where your backend is expecting the data
      const response = await axios.post('http://localhost:3000/contactus', formData);

      // Handle the response as needed
      console.log('Data successfully sent to the server:', response.data);

      // Show the success message
      setShowSuccessMessage(true);

      // Reset the form data
      setFormData({
        username: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending data to the server:', error);
    }
  };

  const handleSuccessMessageClose = () => {
    setShowSuccessMessage(false);
  };

  return (
    <div>
      <Userheader></Userheader>
      <center>
        <Container sx={{ border: '2px solid black', borderRadius: '8px', maxWidth: '500px', marginTop: '40px' }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Contact Us
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Email /> <Typography variant="body1">Email: Dejavu@gmail.com</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <Phone /> <Typography variant="body1">Phone: +91 34567890</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <LocationOn /> <Typography variant="body1">Address: 123 Main St, City, Country</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="username"
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Your Email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="message"
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Send
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </center>
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={3000}
        onClose={handleSuccessMessageClose}
        message="Feedback received successfully!"
      />
    </div>
  );
};

export default ContactUs;