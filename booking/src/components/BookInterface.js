import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AcIcon from '@mui/icons-material/AcUnit';
import NonAcIcon from '@mui/icons-material/Brightness1';
import SeaterIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import SleeperIcon from '@mui/icons-material/Hotel';
import BeforeTenAMIcon from '@mui/icons-material/WbTwilight';
import TenAMToFivePMIcon from '@mui/icons-material/Brightness5';
import FivePMToElevenPMIcon from '@mui/icons-material/NightsStay';
import AfterElevenPMIcon from '@mui/icons-material/LightMode';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from './public/newlogo.jpg';
import Header from './userheader';


const BusCard = ({ bus }) => {
  const navigate = useNavigate();

  const handleShowSeats = () => {
    navigate('/seatvacancy', { state:{ busData: bus } });
  };
  return (
    <div>
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        marginBottom: '16px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        width: '850px',
      }}
    >
      <Box>
        <Typography variant="h6">{bus.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {bus.acornonac} {bus.seaterorsleeper}
        </Typography>
        <Box display="flex" alignItems="center">
          <Rating name="read-only" value={bus.rating} readOnly precision={0.5} />
          <Typography variant="body2" color="text.secondary">
            ({bus.rating})
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="body2">
          {bus.boardingtime} - {bus.droptime}
        </Typography>
        <Typography variant="body2">
          {bus.boarding} - {bus.destination}
        </Typography>
        <Box display="flex" alignItems="center">
          <TrackChangesIcon />
          <Typography variant="body2" color="text.secondary">
            Live Tracking
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6">₹{bus.price}</Typography>
        <Button variant="contained" color="primary" onClick={handleShowSeats}>
          Show Seats
        </Button>
        <Typography variant="body2" color="text.secondary">
          {bus.seatstatus}
        </Typography>
      </Box>
    </Card>
    </div>
  );
};

const FilterComponent = ({
  priceDropChecked,
  handlePriceDropChange,
  priceRange,
  handlePriceRangeChange,
  selectedBusType,
  handleBusTypeChange,
  selectedDepartureTime,
  handleDepartureTimeChange,
}) => {
  return (
    <Card
      sx={{
        width: 300,
        marginRight: 2,
        height: '440px',
        padding: 2,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        marginLeft: '20px',
        marginBottom: '20px',
        backgroundColor: '#fff',
        border: '5px solid #f5f5f5',
      }}
    >
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <label>
            <input
              type="checkbox"
              checked={priceDropChecked}
              onChange={handlePriceDropChange}
            />
            Price Drop
          </label>
        </div>
        <span>Bus Type:</span>
        <br></br>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
            <Button
              variant={selectedBusType.includes('ac') ? 'contained' : 'outlined'}
              startIcon={<AcIcon />}
              onClick={() => handleBusTypeChange('ac')}
              style={{ marginRight: '8px', marginBottom: '8px' }}
            >
              AC
            </Button>
            <Button
              variant={selectedBusType.includes('non-ac') ? 'contained' : 'outlined'}
              startIcon={<NonAcIcon />}
              onClick={() => handleBusTypeChange('non-ac')}
              style={{ marginRight: '8px', marginBottom: '8px' }}
            >
              Non AC
            </Button>
            <Button
              variant={selectedBusType.includes('seater') ? 'contained' : 'outlined'}
              startIcon={<SeaterIcon />}
              onClick={() => handleBusTypeChange('seater')}
              style={{ marginRight: '8px', marginBottom: '8px' }}
            >
              Seater
            </Button>
            <Button
              variant={selectedBusType.includes('sleeper') ? 'contained' : 'outlined'}
              startIcon={<SleeperIcon />}
              onClick={() => handleBusTypeChange('sleeper')}
              style={{ marginRight: '8px', marginBottom: '8px' }}
            >
              Sleeper
            </Button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <span>{priceRange.min}</span>
          <div style={{ flex: 1, marginLeft: '8px', marginRight: '8px' }}>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={priceRange.value}
              onChange={handlePriceRangeChange}
              style={{ width: '100%' }}
            />
          </div>
          <span>{priceRange.max}</span>
        </div>
        <span>Price Range</span>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Button
              variant={selectedDepartureTime.includes('before-10am') ? 'contained' : 'outlined'}
              startIcon={<BeforeTenAMIcon style={{ transform: 'rotate(-20deg)' }} />}
              onClick={() => handleDepartureTimeChange('before-10am')}
              style={{ marginRight: '8px' }}
            >
              Before 10 AM
            </Button>
            <Button
              variant={selectedDepartureTime.includes('10am-5pm') ? 'contained' : 'outlined'}
              startIcon={<TenAMToFivePMIcon style={{ transform: 'rotate(20deg)' }} />}
              onClick={() => handleDepartureTimeChange('10am-5pm')}
              style={{ marginRight: '8px' }}
            >
              10 AM - 5 PM
            </Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <Button
              variant={selectedDepartureTime.includes('5pm-11pm') ? 'contained' : 'outlined'}
              startIcon={<FivePMToElevenPMIcon style={{ transform: 'rotate(20deg)' }} />}
              onClick={() => handleDepartureTimeChange('5pm-11pm')}
              style={{ marginRight: '8px' }}
            >
              5 PM - 11 PM
            </Button>
            <Button
              variant={selectedDepartureTime.includes('after-11pm') ? 'contained' : 'outlined'}
              startIcon={<AfterElevenPMIcon style={{ transform: 'rotate(-20deg)' }} />}
              onClick={() => handleDepartureTimeChange('after-11pm')}
              style={{ marginRight: '8px' }}
            >
              After 11 PM
            </Button>
          </div>
          <span>Departure Time</span>
        </div>
      </CardContent>
    </Card>
  );
};

const Home = () => {
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

  const imageStyle = {
    width: '305px',
    height: '180px',
    borderRadius: '8px',
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
    marginTop: '0px',
    marginBottom: '250px',
    width: '1000px',
    border: '2px solid #ccc',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '15px',
    borderRadius: '15px',
    background: 'white',
    boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.2)',
  };

  const inputStyle = {
    width: '250px',
    border: '1px solid #ccc',
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
    backgroundColor: '#4caf50',
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

  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const fromStationSuggestions = ['Hyderabad', 'Vskp', 'Vzm'];
  const toStationSuggestions = ['Vzm', 'Vskp', 'Guntur'];

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

  const paragraphContainerStyle = {
    width: '1400px',
    border: '2px solid black',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '15px',
    margin: 'auto',
    maxWidth: '80%',
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/view', { state: { fromStation, toStation, selectedDate } });
  };

  return (
    <div>
      <div style={bodyStyle}>
        {/* ... (existing JSX) */}
      </div>

      {/* ... (existing JSX) */}
    </div>
  );
};

const View = () => {
  const location = useLocation();
  const { fromStation, toStation, selectedDate } = location.state || {};

  const [priceDropChecked, setPriceDropChecked] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 100, max: 3999, value: 100 });
  const [selectedBusType, setSelectedBusType] = useState([]);
  const [selectedDepartureTime, setSelectedDepartureTime] = useState([]);
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/buses');
        const filteredBuses = response.data.filter(
          (bus) =>
            bus.boarding.toLowerCase().includes(fromStation.toLowerCase()) &&
            bus.destination.toLowerCase().includes(toStation.toLowerCase())
        );
        setBuses(filteredBuses);
        setFilteredBuses(filteredBuses);
      } catch (error) {
        console.error('Error fetching buses:', error);
      }
    };

    if (fromStation && toStation) {
      fetchBuses();
    }
  }, [fromStation, toStation]);

  const handlePriceDropChange = () => {
    setPriceDropChecked(!priceDropChecked);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange({ ...priceRange, value: event.target.value });
    filterBuses();
  };

  const handleBusTypeChange = (type) => {
    const updatedBusType = selectedBusType.includes(type)
      ? selectedBusType.filter((item) => item !== type)
      : [...selectedBusType, type];
    setSelectedBusType(updatedBusType);
    filterBuses();
  };

  const handleDepartureTimeChange = (time) => {
    const updatedDepartureTime = selectedDepartureTime.includes(time)
      ? selectedDepartureTime.filter((item) => item !== time)
      : [...selectedDepartureTime, time];
    setSelectedDepartureTime(updatedDepartureTime);
    filterBuses();
  };

  const filterBuses = () => {
    let filtered = buses;

    // Filter by price range
    filtered = filtered.filter((bus) => bus.price >= priceRange.value);

    // Filter by bus type
    if (selectedBusType.length > 0) {
      filtered = filtered.filter((bus) =>
        selectedBusType.includes(bus.acornonac.toLowerCase()) ||
        selectedBusType.includes(bus.seaterorsleeper.toLowerCase())
      );
    }

    // Filter by departure time
    if (selectedDepartureTime.length > 0) {
      filtered = filtered.filter((bus) => {
        const departureTime = bus.boardingtime.split(' ')[1];
        return selectedDepartureTime.some((time) => {
          switch (time) {
            case 'before-10am':
              return departureTime < '10:00';
            case '10am-5pm':
              return departureTime >= '10:00' && departureTime < '17:00';
            case '5pm-11pm':
              return departureTime >= '17:00' && departureTime < '23:00';
            case 'after-11pm':
              return departureTime >= '23:00';
            default:
              return false;
          }
        });
      });
    }

    setFilteredBuses(filtered);
  };

  useEffect(() => {
    filterBuses();
  }, [priceRange, selectedBusType, selectedDepartureTime, buses]);

  return (
    <div>
      <Header /> {/* Include the Header component here */}
      <div style={{ display: 'flex', marginTop: '40px' }}>
        <FilterComponent
          priceDropChecked={priceDropChecked}
          handlePriceDropChange={handlePriceDropChange}
          priceRange={priceRange}
          handlePriceRangeChange={handlePriceRangeChange}
          selectedBusType={selectedBusType}
          handleBusTypeChange={handleBusTypeChange}
          selectedDepartureTime={selectedDepartureTime}
          handleDepartureTimeChange={handleDepartureTimeChange}
        />

        <div>
          {filteredBuses.map((bus) => (
            <BusCard key={bus._id} bus={bus} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default View;