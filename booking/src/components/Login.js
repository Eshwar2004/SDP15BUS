import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import MenuItem from '@mui/material/MenuItem';

const defaultTheme = createTheme();

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'user',
  });
  const [errors, setErrors] = useState({});

  const userObj = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate role
    const isRoleValid = validateRole(credentials.role);
    if (!isRoleValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        role: 'Invalid role selection',
      }));
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/server/auth/signin", credentials);
      const { token, role } = response.data;

      // Redirect based on the user's role
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/Userhome');
      }

      toast.success("Login successful");
      userObj.login(token);
      sessionStorage.setItem('accessToken', token);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials");
      } else {
        toast.error("Login failed");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      role: e.target.value,
    }));
  };

  // Custom validation function for role
  const validateRole = (role) => {
    return ['user', 'admin'].includes(role);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
            />
            <TextField
              select
              margin="normal"
              fullWidth
              id="role"
              label="Role"
              value={credentials.role}
              onChange={handleRoleChange}
              error={!!errors.role}
              helperText={errors.role}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="OtpMailAndVerification" variant="body2">
                  Login with Otp
                </Link>
              </Grid>
              <Grid item>
                <RouterLink to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}