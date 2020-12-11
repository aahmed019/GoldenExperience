import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                            
                            <li><Link to="/Order">Orders</Link></li>
                            
                            <li><Link to="/Menu">Menu</Link></li>
                            
                            <li><Link to="/Discussion">Discussion</Link></li>
                            
                            </p>
                            </ul>
                            <strong>The Golden Experience © 2020</strong>
                           
                        </div>
                    </footer>
                
        )
    }
    
}
export default Footer; 