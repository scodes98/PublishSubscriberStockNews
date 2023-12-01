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

    var [messages, setMessages] = useState([]);

    useEffect(() => {
        const postRequest = async () => {
            try {
              const response = await axios.post(URLS.PUBLISHER_GET_MESSAGES_BY_TOPIC,
                    {
                        subscriberUsername: localStorage.getItem('user'),
                        publishSectorIds: data
                    }
                );
                
                var m = [];
                if(response.data.length){
                    console.log('POST response:', response.data);
                }
                for(var i=0; i < response.data.length; i++){
                    for(var j=0; j < response.data[i].messages.length; j++){
                        m.push({
                            publishSector: response.data[i].publishSector,
                            message: response.data[i].messages[j]
                        });
                    }
                }
                setMessages(prevMessages => [...m, ...prevMessages]);
                
                } catch (error) {
                console.error('Error during POST request:', error);
            }
        };
        const delay = 5000;
        const timeoutId = setTimeout(() => {
            postRequest();
        }, delay);
        return () => clearTimeout(timeoutId);
        
    }); 

    const handleLogOut = ()=>{
        localStorage.removeItem('user');
        navigate("/");
    }
    console.log(messages);

    return (
        <div className='mainContainer'>
            <Button className="logoutBtn" variant="danger" onClick={handleLogOut}>Logout</Button>
            {/* {console.log("message list : ", messages)} */}
            <div className='messageCardList'>
            {
                messages.map((item) => (
                    <MDBCard style={{marginBottom:'10px', width: '750px'}}>
                        <MDBCardBody>
                            <MDBCardTitle>{item.publishSector}</MDBCardTitle>
                            <MDBCardText>{item.message}</MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                ))
            }
            </div>
            
        </div>
    );
};

export default SubscriberMessages;