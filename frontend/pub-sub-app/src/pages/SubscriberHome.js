
import './SubscriberHome.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import * as URLS from './../utils.js';
// import SubscriberMessages from './SubscriberMessages';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

const SubscriberHome = () => {
    const theme = useTheme();
    const [options, setOptions] = useState([]);
    const [topicNames, setTopicNames] = useState([]);

    const handleLogOut = ()=>{
        localStorage.removeItem('user');
        navigate("/");
    }

    useEffect(() => {
        axios.get(URLS.PUBLISHER_GET_TOPIC)
          .then((response) => {
            console.log(response.data);
            setOptions(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
    }, []);

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setTopicNames(
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    
    const getIdsBySelectedSectorNames = (data, selectedSectorNames) => {
        return selectedSectorNames.map(name => {
            const foundObject = data.find(item => item.publishSector === name);
            return foundObject ? foundObject.id : null;
        });
    };
    console.log(topicNames);
    const correspondingIds = getIdsBySelectedSectorNames(options, topicNames);
    console.log(correspondingIds);

    const navigate = useNavigate();
    const   handleButtonClick = async () => {
        navigate('/subscriber/messages', { state: correspondingIds});
    };
      
    return (
        <div className='mainContainer'>
            <Button className="logoutBtn" variant="danger" onClick={handleLogOut}>Logout</Button>
            <div className="centered">
                <Card className="text-center">
                    <Card.Header>SUBSCRIBER</Card.Header>
                    <Card.Body>
                        <Card.Title>Subscribe to Topics here !!</Card.Title>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-chip-label">Topics</InputLabel>
                            <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={topicNames}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Topics" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            >
                            {options.map((item) => (
                                <MenuItem
                                key={item.id}
                                value={item.publishSector}
                                style={getStyles(item, topicNames, theme)}
                                >
                                {item.publishSector}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                        <div>
                            <Button variant="primary" onClick={handleButtonClick} >Subscribe</Button>
                            
                        </div>
                        
                    </Card.Body>
                    <Card.Footer className="text-muted">COEN 327</Card.Footer>
                </Card>
            </div>
        </div>
        
    );
}

export default SubscriberHome;