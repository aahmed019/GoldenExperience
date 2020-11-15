import React, { Component } from 'react';
import {Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import '../../App.css';

import './footer.css';

class Footer extends Component{
    render(){
        return(
                
                    <footer className="footer-all">
                        <br></br>
                        More Information
                        <div className="footer-info">
                            <ul className="navItems">
                            <p>
                            <li><Link to="/Home">Home</Link></li>
                            
                            <li><a>Orders</a></li>
                            
                            <li><a>Menu</a></li>
                            
                            <li><a>Discussion</a></li>
                            
                            </p>
                            </ul>
                            <strong>The Golden Experience © 2020</strong>
                           
                        </div>
                    </footer>
                
        )
    }
    
}
export default Footer; 