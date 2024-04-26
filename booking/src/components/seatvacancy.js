import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import ChairIcon from '@mui/icons-material/Chair';
import axios from 'axios';
//import Tickets from './Tickets';
//import Razorpay from 'razorpay-checkout';

const useStyles = makeStyles({
  seatCard: {
    marginTop: '40px',
    marginRight: '80px',
    width: '40%',
    textAlign: 'left',
    boxShadow: '0px 0px 10px rgba(255, 165, 0, 0.5)',
    border: '2px solid orange',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formCard: {
    marginTop: '40px',
    marginRight: '80px',
    width: '20%',
    textAlign: 'top',
    boxShadow: '0px 0px 10px rgba(255, 165, 0, 0.5)',
    border: '2px solid orange',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
  },
});

const SeatVacancy = () => {
  const location = useLocation();
  const { busData } = location.state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ID: busData ? busData.ID : '',
    name: busData ? busData.name : '',
    boarding: '',
    destination: '',
    price: busData ? busData.price : '',
    seatsselected: [],
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [seatVacancy, setSeatVacancy] = useState([]);

  useEffect(() => {
    if (busData && busData.seatvacancy) {
      setSeatVacancy(busData.seatvacancy.split(',').map(Number));
    }
  }, [busData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSeatSelect = (seatNumber) => {
    setFormData((prevData) => {
      const isSelected = prevData.seatsselected.includes(seatNumber);
      if (isSelected) {
        return {
          ...prevData,
          seatsselected: prevData.seatsselected.filter((seat) => seat !== seatNumber),
        };
      } else {
        return {
          ...prevData,
          seatsselected: [...prevData.seatsselected, seatNumber],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const modifiedFormData = {
        ...formData,
        seatsselected: formData.seatsselected.join(','),
      };

      const response = await axios.post('http://busdejavu-backend.vercel.app/book', modifiedFormData, { headers });
      console.log(response.data);
      setFormSubmitted(true);

      // Navigate to the Tickets page after successful form submission
      navigate('/Tickets', { state: { bookingData: response.data } });
    } catch (error) {
      console.error('Error submitting form:', error);

      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('Error during request setup:', error.message);
      }
    }
  };

  const handlePayment = () => {
    if (formData.price === undefined || formData.price === '') {
      alert("Please enter an amount");
    } else {
      const options = {
        key: "rzp_test_fwYaiaGpXgx0lJ",
        amount: formData.price * 100, // Multiply by 100 to convert to paise
        currency: "INR",
        name: "BUSDEJAVU",
        handler: function (response) {
          alert(`Payment of Rs.${formData.price}/- is Successful`);
        },
        prefill: {
          name: "admin",
          email: "viveksai539@gmail.com",
          contact: "9030556910"
        },
        notes: {
          address: "Razorpay Corporate office"
        },
        theme: {
          color: "8e3969"
        }
      };
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    }
  };

  const classes = useStyles();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card className={classes.seatCard}>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            {[...Array(4)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: 'flex',
                  gap: '10px',
                  justifyContent: 'center',
                  marginBottom: rowIndex === 1 ? '40px' : '20px',
                }}
              >
                {[...Array(7)].map((_, seatIndex) => {
                  const seatNumber = rowIndex * 7 + seatIndex + 1;
                  const isSelected = formData.seatsselected.includes(seatNumber);
                  const isVacant = seatVacancy.includes(seatNumber);
                  return (
                    <Button
                      key={seatNumber}
                      variant="outlined"
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '1px solid black',
                        textAlign: 'center',
                        lineHeight: '40px',
                        backgroundColor: isSelected ? '#00FF00' : isVacant ? '#90EE90' : '#FF0000',
                        color: '#000000',
                      }}
                      startIcon={<ChairIcon style={{ color: '#ffffff' }} />}
                      onClick={() => handleSeatSelect(seatNumber)}
                      disabled={!isVacant}
                    >
                      {seatNumber}
                    </Button>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className={classes.formCard}>
        <CardContent className={classes.formContent}>
          <TextField
            name="ID"
            label="ID"
            value={formData.ID}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            name="boarding"
            label="Boarding"
            value={formData.boarding} // Display default value
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            name="destination"
            label="Destination"
            value={formData.destination} // Display default value
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            name="price"
            label="Price"
            value={formData.price}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            name="seatsselected"
            label="Selected Seats"
            value={formData.seatsselected.join(',')}
            variant="outlined"
            disabled
          />
          <Button variant="contained" color="primary" onClick={handlePayment}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeatVacancy;