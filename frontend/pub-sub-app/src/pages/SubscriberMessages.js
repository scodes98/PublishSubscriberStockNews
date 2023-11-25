import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText
} from 'mdb-react-ui-kit';
import './SubscriberMessages.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation } from "react-router-dom";
import * as URLS from './../utils.js';
import axios from 'axios';

const SubscriberMessages = () => {
    const location = useLocation();
    const data = location.state;
    console.log(data);
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const postRequest = async () => {
            try {
              const response = await axios.post(URLS.PUBLISHER_GET_MESSAGES_BY_TOPIC,
                {
                    publishSectorIds: data
                }
            );
            console.log('POST response:', response.data);
            setMessages(response.data);

            } catch (error) {
              console.error('Error during POST request:', error);
            }
        };
        postRequest();
    }); 

    return (
        <div className='mainContainer'>
            <Button className="logoutBtn" variant="danger" onClick={() => navigate("/")}>Logout</Button>
            <div className='messageCardList'>
            {
                messages.map((item) => (
                    <MDBCard style={{marginBottom:'10px', width: '750px'}}>
                        <MDBCardBody>
                            <MDBCardTitle>{item.publishSector}</MDBCardTitle>
                            <MDBCardText>{item.publishMessage}</MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                ))
            }
            </div>
            
        </div>
    );
};

export default SubscriberMessages;