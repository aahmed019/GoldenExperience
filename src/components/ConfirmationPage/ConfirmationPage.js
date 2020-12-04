import React, { Component } from 'react';
import Footer from '../Footer/Footer.js'
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
                                <div className = "user">Please click profile to check the status on your account! Our manager is reviewing your account!<br/></div>   
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