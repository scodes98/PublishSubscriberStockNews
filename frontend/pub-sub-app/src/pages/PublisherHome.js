
import './PublisherHome.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import * as URLS from './../utils.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PublisherHome = () => {
    const [options, setOptions] = useState([]);
    const [topicId, setTopicId] = useState('');
    const [message, setMessage] = useState('');

    console.log(topicId, message);

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

    const handlePublish = async (e) => {
        console.log('here');
        e.preventDefault();
        try {
            await axios.post(URLS.PUBLISHER_PUBLISH_DATA,
                {
                    publishMasterId: topicId,
                    publishSector: options.find(item => item.id === topicId).publishSector,
                    publishMessage: message
                }
            )
            toast.success('Message published successfully!', {
                position: 'top-left',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            console.log(err.message);
            toast.error('Error while publishing message!', {
                position: 'top-left',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const navigate = useNavigate();
    return (
        <div className='mainContainer'>
            <Button className="logoutBtn" variant="danger" onClick={handleLogOut}>Logout</Button>
            <div className="centered">
                <Card className="text-center">
                    <Card.Header>PUBLISHER</Card.Header>
                    <Card.Body>
                        <Card.Title>Publish your message here !!</Card.Title>
                        <FormControl fullWidth>
                            <InputLabel style={{margin: '10px'}} id="demo-simple-select-label">Topic</InputLabel>
                            <Select
                                style={{margin: '10px'}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={topicId}
                                label="Topic"
                                onChange={(e) => setTopicId(e.target.value)}
                            >
                                {
                                    options.map((eachTopic)=>(
                                        <MenuItem value={eachTopic.id}>{eachTopic.publishSector}</MenuItem>
                                    ))
                                }
                            
                            </Select>
                            <TextField 
                                style={{margin: '10px'}}
                                id="outlined-basic"
                                label="Message"
                                variant="outlined"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </FormControl>
                        <Button variant="primary" onClick={handlePublish}>Publish</Button>
                        <ToastContainer/>
                    </Card.Body>
                    <Card.Footer className="text-muted">COEN 327</Card.Footer>
                </Card>
            </div>
        </div>
        
    );
}

export default PublisherHome;