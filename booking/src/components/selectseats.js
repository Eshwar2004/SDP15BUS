import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import SeatIcon from '@mui/icons-material/EventSeat';
import Header from './Header';

const SeatSelection = ({ open, onClose, busId }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    // Handle seat selection logic
    setSelectedSeats((prevSeats) => [...prevSeats, seatNumber]);
  };

  const handleReserveSeats = async () => {
    try {
      // Make an API call to update seat status
      const response = await fetch(`http://sdp-15-bus.vercel.app/buses`, {
        method: 'POST', // You might need to adjust the HTTP method based on your API design
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          busId: busId,
          selectedSeats: selectedSeats,
        }),
      });

      if (response.ok) {
        // Successfully updated seat status in the database
        console.log('Seats reserved successfully');
        onClose(); // Close the modal after updating the database
      } else {
        // Handle error response from the server
        console.error('Failed to reserve seats');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error while reserving seats:', error);
    }
  };

  return (
    <div>
      <Header></Header>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Seat Selection</DialogTitle>
      <DialogContent>
        <div>
          {Array.from({ length: 40 }, (_, index) => index + 1).map((seatNumber) => (
            <Button
              key={seatNumber}
              variant={selectedSeats.includes(seatNumber) ? 'contained' : 'outlined'}
              color="primary"
              startIcon={<SeatIcon />}
              onClick={() => handleSeatClick(seatNumber)}
              style={{ margin: '4px' }}
            >
              {seatNumber}
            </Button>
          ))}
        </div>
        <Button variant="contained" color="primary" onClick={handleReserveSeats}>
          Reserve Seats
        </Button>
      </DialogContent>
    </Dialog>
    </div>
  );
};

export default SeatSelection;
