import React, { Component } from 'react';
import Footer from '../Footer/Footer.js'
import {Link} from 'react-router-dom';
import {Row} from "react-bootstrap";
import './ConfirmationPage.css'

class ConfirmationPage extends Component{
    render(){
        return(
            <div>
                <div className = "background-boi">
                    <div className ="container">
                        <div>
                        <Row >
                            <Row className = "first-set">
                                <div className ="signup-title">Thank you for Registering!</div><br></br>
                            </Row>
                            <Row  className = "second-set">
                                <div className = "user">You will recieve an email confirmation for you account once our manager has approved your account!<br/></div>   
                            </Row>
                            <Row className = "first-set">
                                <div className ="reg-button">
                                    <button className = "button-options"><Link to ={{pathname: "/Home" }} >Return to Home Page</Link></button>
                                </div>
                            </Row>
                        </Row>     
                        </div>
                    </div>
                </div>
            <Footer/>
            </div>
           
        )
    }
}
export default ConfirmationPage;