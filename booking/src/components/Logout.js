import React from 'react';
import Button from '@mui/material/Button';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Placeholder for the logout function, replace it with your actual logout logic
const logout = () => {
  // Your logout logic here
  console.log("Logging out...");
};

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call your logout function

    // Redirect to the login page after logout
    navigate('/home');
    toast.success('Logged out successfully');
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
