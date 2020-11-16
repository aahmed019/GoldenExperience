import React, { Component } from 'react';
import {Row, Col} from "react-bootstrap";
import {Link} from 'react-router-dom';
import './LandingPage.css'
import logo from '../../images/logoforschool.png';
import Footer from '../Footer/Footer.js';

class LandingPage extends Component{
    render(){

        return(
            <div>
            <div className ="welcome-template">
                <div className = "welcome-comment">
                    <span className ="welcome">WELCOME</span><br></br>
                    <img classname ="logoforschool3" src={logo} style ={{width:'70%'}}></img>
                </div>

            </div>
            <Footer/>
            </div>
            
        )
    }
}
export default LandingPage;