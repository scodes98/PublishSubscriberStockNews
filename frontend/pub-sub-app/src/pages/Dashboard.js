
import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import './Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="centered">
            <div className='container'>
                <div className='Box'>
                    <div className="heading">
                        <h4 >Pub Sub Notification for Stock News</h4>
                    </div>
                </div>
                
                <div className='Box'>
                    <div className="groupButton">
                        <Button className="modifiedBtn" variant="contained" onClick={() => navigate("/publisher")}>Publisher</Button>
                        <Button className="modifiedBtn" variant="contained" onClick={() => navigate("/subscriber")}>Subscriber</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;