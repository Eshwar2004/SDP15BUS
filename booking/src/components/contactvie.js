import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import AdminHeader from './adminheader';

const Contactvie = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://busdejavu-backend.vercel.app/contactus'); // Adjust the endpoint
        setContacts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div>
        <AdminHeader></AdminHeader>
      <Container>
        <Typography variant="h5" component="h2" gutterBottom>
          Contacts
        </Typography>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Grid container spacing={2}>
            {contacts.map((contact) => (
              <Grid item xs={12} key={contact._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      Name: {contact.username}
                    </Typography>
                    <Typography variant="body1">
                      Email: {contact.email}
                    </Typography>
                    <Typography variant="body1">
                      Message: {contact.message}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Contactvie;
