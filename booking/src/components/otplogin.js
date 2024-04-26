import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function OtpMailAndVerification() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        console.log(email);
        const data = {
            semail: email
        };
        try {
            await axios.post("http://sdp-15-bus.vercel.app/api/sendotp", data);
            console.log("OTP Sent Successfully");
            setIsOtpSent(true);
            setMessage('OTP sent to your email');
        } catch (error) {
            console.log(error);
            setMessage('Error sending OTP');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const data = {
            otp,
            email,
        };
        console.log(data);

        try {
            const response = await axios.post("http://sdp-15-bus.vercel.app/api/verifyotp", data);
            console.log(response);

            if (response.data.success) {
                setMessage('OTP verification successful');
                navigate('/Userhome'); // Redirect to home2 page on successful verification
            } else {
                setMessage('Incorrect OTP');
            }
        } catch (err) {
            console.log(err);
            setMessage('An error occurred during OTP verification');
        }
    };

    return (
        <center>
            <div className="center">
                <Card className='sendotp' variant="outlined" style={{ width: '300px', height: '250px' }}>
                    <CardContent>
                        <div className='container mt-4'>
                            <div className='form-control'>
                                {!isOtpSent ? (
                                    <form onSubmit={handleSendOtp}>
                                        <TextField
                                            label="Enter Email"
                                            type='email'
                                            value={email}
                                            fullWidth
                                            sx={{ mb: 2 }} // Add margin bottom to create spacing
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <div align="center">
                                            <Button variant="contained" color="primary" className="mt-3" type='submit'>
                                                Send OTP
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={handleVerifyOtp}>
                                        <TextField
                                            label="Enter Email"
                                            type='email'
                                            value={email}
                                            fullWidth
                                            disabled
                                            sx={{ mb: 2 }} // Add margin bottom to create spacing
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <TextField
                                            label="Enter OTP"
                                            value={otp}
                                            type='text'
                                            fullWidth
                                            sx={{ mb: 2 }} // Add margin bottom to create spacing
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                        <div align="center">
                                            <Button variant="contained" color="primary" className="mt-3" type='submit'>
                                                Verify OTP
                                            </Button>
                                        </div>
                                    </form>
                                )}
                                <div className="mt-3" align="center">
                                    {message && <p className={message.includes('successful') ? 'text-success' : 'text-danger'}>{message}</p>}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </center>
    );
}

export default OtpMailAndVerification;
