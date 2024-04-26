import React, { useState, useEffect } from 'react';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link, useNavigate } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Header from './Header.js';
import backgroundImage from './public/newlogo.jpg';
import image1 from './public/image1.jpg';
import image2 from './public/image2.jpg';
import image3 from './public/image3.jpg';
import image4 from './public/image4.jpg';
import image5 from './public/image5.jpg';
import image6 from './public/image6.jpg';
import image7 from './public/image7.jpg';
import image8 from './public/image8.jpg';
import image9 from './public/image9.jpg';
import image10 from './public/image10.jpg';
import image11 from './public/image11.jpg';

const Home = () => {
    const [showBackgroundVideo, setShowBackgroundVideo] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Hide the background video when the component mounts
        setShowBackgroundVideo(false);
    }, []);

    const imageStyle = {
        width: '305px',
        height: '180px',
        borderRadius: '8px',
    };

    const bodyStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'contain%',
        minHeight: '50vh',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100px',
      };
    const marqueeStyle = {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '18px',
        color: '#ffffff',
        marginTop: '10px',
    };

    const marqueeContainerStyle = {
        display: 'flex',
        gap: '10px',
    };

    const containerStyle = {
        marginTop: '100px',
        marginBottom: '150px',
        width: '1000px',
        border: '2px solid #003366',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '15px',
        borderRadius: '15px',
        background: '#FFF8DC',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.2)',
    };

    const inputStyle = {
        width: '250px',
        border: '1px solid #003366',
        borderRadius: '15px',
        padding: '15px',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.8)',
    };

    const buttonStyle = {
        width: '200px',
        border: 'none',
        backgroundColor: '#FF6600',
        color: 'white',
        padding: '15px 25px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '15px',
    };

    const paragraphContainerStyle = {
        width: '1400px',
        border: '4px solid #003366',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '15px',
        margin: 'auto',
        maxWidth: '95%',
    };

    const [fromStation, setFromStation] = useState('');
    const [toStation, setToStation] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const fromStationSuggestions = ['Hyderabad', 'Vishakhapatnam', 'Vizianagaram'];
    const toStationSuggestions = ['Vizianagaram', 'Vishakhapatnam', 'Guntur', 'Hyderabad'];

    const handleFromStationChange = (event) => {
        setFromStation(event.target.value);
    };

    const handleToStationChange = (event) => {
        setToStation(event.target.value);
    };

    const dropdownStyle = {
        position: 'absolute',
        left: 0,
        zIndex: 1,
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.2)',
        maxHeight: '150px',
        overflowY: 'auto',
    };

    const handleSearch = () => {
        navigate('/login', { state: { fromStation, toStation, selectedDate } });
    };

    return (
        <div>
            <Header />
            {showBackgroundVideo && (
                <video autoPlay muted loop style={{ position: 'fixed', minWidth: '100%', minHeight: '100%', zIndex: '-1' }}>
                    <source src={backgroundImage} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            <center>
                <div style={bodyStyle}>
            <div style={containerStyle}>
                <div style={{ position: 'relative' }}>
                    <div style={inputStyle}>
                        <DirectionsBusIcon style={{ marginRight: '5px' }} />
                        <input
                            type="text"
                            placeholder="From Station"
                            value={fromStation}
                            onChange={handleFromStationChange}
                            style={{ flex: 1, border: 'none', outline: 'none' }}
                            list="fromStationSuggestions"
                        />
                        
                    </div>
                    
                    <datalist style={{ ...dropdownStyle, top: 'calc(100% + 10px)' }} id="fromStationSuggestions">
                        {fromStationSuggestions.map((suggest, index) => (
                            <option key={index} value={suggest} />
                        ))}
                    </datalist>
                </div>
                <div style={{ position: 'relative' }}>
                    <div style={inputStyle}>
                        <LocationOnIcon style={{ marginRight: '5px' }} />
                        <input
                            type="text"
                            placeholder="To Station"
                            value={toStation}
                            onChange={handleToStationChange}
                            style={{ flex: 1, border: 'none', outline: 'none' }}
                            list="toStationSuggestions"
                        />
                    </div>
                    <datalist style={{ ...dropdownStyle, top: 'calc(100% + 10px)' }} id="toStationSuggestions">
                        {toStationSuggestions.map((suggest, index) => (
                            <option key={index} value={suggest} />
                        ))}
                    </datalist>
                </div>
                <input type="date" style={inputStyle} onChange={(e) => setSelectedDate(e.target.value)} />
                <button style={buttonStyle} onClick={handleSearch}>
                    Search
                </button>
            </div>
            </div>
            </center>

            <div style={marqueeStyle}>
                <marquee>
                    <div style={marqueeContainerStyle}>
                        {[image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11].map((image, index) => (
                            <img key={index} src={image} alt={`Image ${index + 1}`} style={imageStyle} />
                        ))}
                    </div>
                </marquee>
            </div>
            <center>
                <Fade bottom>
                    <Card style={{ backgroundColor: '#FFF8DC', width: '97%', marginTop: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
                        <CardContent>
                            <div className="paragraph-container" style={paragraphContainerStyle}>
                                <h2 style={{ textAlign: 'left', fontFamily: 'Arial, sans-serif', fontSize: '24px', color: '#003366', marginBottom: '20px' }}>Online Bus Booking Services:</h2>
                                <p style={{ textAlign: 'left', fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#111' }}>
                                    <b>Bus Dejavu</b> is India's top online bus ticket booking company. Check out our budget-friendly offerings and use discount coupons to book bus tickets at the lowest possible price. You may look up bus schedules, compare fares, and get all the information you need to arrange an optimal and comfortable bus trip.
                                    <br />
                                    Bus Dejavu has made it easier to book buses online for your travel needs.
                                    <br />
                                    If you need to cancel your ticket or change the dates, you can save time and money by using DejavuCash as a refund option, which can be used immediately.
                                    <br />
                                    Book now!!! Browse through all of your bus route possibilities and use our unique smart filters to ensure a dependable and comfortable ride tailored to your schedule.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </Fade>
                <Fade bottom>
                    <Card style={{ backgroundColor: '#FFF8DC', width: '97%', marginTop: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
                        <CardContent>
                            <div className="paragraph-container" style={paragraphContainerStyle}>
                                <h2 style={{ textAlign: 'left', fontFamily: 'Arial, sans-serif', fontSize: '24px', color: '#003366', marginBottom: '20px' }}>Online Bus Ticket Booking at Lowest Price:</h2>
                                <p style={{ textAlign: 'left', fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#111' }}>
                                    Bus Dejavu allows travellers to book bus tickets online at the lowest ticket prices. Online bus booking allows travellers to select their preferred bus. AbhiBus is the best location to book bus tickets because it offers a large selection of private buses as well as SRTC (State Road Transport Corporation) buses for online booking. The following buses are available for booking on AbhiBus at the lowest fare:
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <ul>
                                                <li>AC Buses</li>
                                                <li>Non AC Buses</li>
                                                <li>Ordinary Buses</li>
                                                <li>Mini Buses</li>
                                                <li>Super Luxury (Non-AC Seater)</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <ul>
                                                <li>Volvo AC Buses</li>
                                                <li>Sleeper AC Buses</li>
                                                <li>Sleeper Buses</li>
                                                <li>Deluxe Buses</li>
                                                <li>Sleeper Cum Seater AC</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <ul>
                                                <li>Double Decker Buses</li>
                                                <li>Mercedes buses</li>
                                                <li>Non-Mercedes buses</li>
                                                <li>Electric Buses</li>
                                                <li>Express Buses</li>
                                            </ul>
                                        </div>
                                    </div>
                                    The bus ticket rate is determined by several criteria, including the type of bus, the bus operator, the distance between the origin and destination cities, the amenities provided by the bus operator, and the fact that bus operators may adjust ticket pricing during the holiday season. When compared to other forms of transportation, using the bus is the best, most cost-effective, and convenient option.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </Fade>
                <Fade bottom>
                    <Card style={{ backgroundColor: '#FFF8DC', width: '97%', marginTop: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
                        <CardContent>
                            <div className="paragraph-container" style={paragraphContainerStyle}>
                                <h2 style={{ textAlign: 'left', fontFamily: 'Arial, sans-serif', fontSize: '24px', color: '#003366', marginBottom: '20px' }}>Benefits of Booking Bus Tickets Online:</h2>
                                <p style={{ textAlign: 'left', fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#111' }}>
                                    In this day and age of technology, offline bus ticket buying is no longer encouraged. Online ticket booking is simple, quick, and hassle-free. AbhiBus meets all three requirements with its user-friendly app and website navigation. Booking bus tickets online with AbhiBus has alleviated many of the obstacles that consumers face while booking tickets at offline counters or through travel agencies. Download the AbhiBus App to enjoy the benefits of booking bus tickets online. Here is a summary of all the benefits of booking bus tickets online through AbhiBus.
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <ul>
                                                <li>AC Buses</li>
                                                <li>Avoid standing in long queues at offline bus ticket counters.</li>
                                                <li>No more hassle of approaching travel agents.</li>
                                                <li>Choose from multiple bus services.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <ul>
                                                <li>Book both Private and SRTC bus tickets online</li>
                                                <li>Check bus ticket availability online.</li>
                                                <li>Get bus timings, ticket price, boarding & dropping point details online.</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <ul>
                                                <li>Access to payment partner discounts and cashback offers.</li>
                                                <li>Free Cancellation - Get 100% refund if your plan changes and you cancel your ticket.</li>
                                                <li>24/7 customer support</li>
                                                <li>Each and every transaction is simple, safe and secure</li>
                                            </ul>
                                        </div>
                                    </div>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </Fade>
            </center>
        </div>
    );
};

export default Home;
