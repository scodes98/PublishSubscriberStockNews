/* eslint-disable jsx-a11y/img-redundant-alt */
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput} from 'mdb-react-ui-kit';
import { useState } from 'react';

import './SubscriberLogin.css';
import axios from 'axios';
import 'material-react-toastify/dist/ReactToastify.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import SubscriberHome from './SubscriberHome';
import Background from '../images/download.png';
import * as URLS from './../utils.js';

const SubscriberLogin = () => {

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URLS.SUBCRIBER_LOGIN_URL,
                {
                    username: user,
                    password: pwd
                }
            )
            console.warn(response);
            setUser(user);
            setPwd(pwd);
            localStorage.setItem("user", user);
            setSuccess(true);
            
        } catch (err) {
            setSuccess(false);
            setErrMsg(err.response.data.message);
            // console.log(err.message);
        }
    }

    return (
        <>
            {success? (
                <>
                   <SubscriberHome/> 
                </>
            ):(
            <MDBContainer style={{backgroundImage: "url("+ Background +")", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <MDBRow >
                <section>
                    {errMsg && (
                    <div style={{ backgroundColor: '#ff0000', color: '#ffffff', padding: '10px', marginTop: '10px' }}>
                        {errMsg}
                    </div>
                    )}
                </section>
                    <MDBCol >
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                    </MDBCol>
                    <MDBCol >
                        <form onSubmit={handleSubmit}>
                            <MDBInput 
                                wrapperClass='mt-5 mb-4'
                                label='Email address'
                                id='emailId'
                                type='email'
                                size="lg"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                            <MDBInput 
                                wrapperClass='mb-4'
                                label='Password'
                                id='passwordU'
                                type='password'
                                size="lg"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                    
                            <div className='text-center text-md-start mt-6 pt-2'>
                                <MDBBtn >Login</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            )}
        </>
        
    );
}

export default SubscriberLogin;