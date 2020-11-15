import React from 'react';
import '../../App.css';
import logo from '../../images/logoforschool.png';
import { Link} from 'react-router-dom';
function navigationBar(){
    return(
    <div className="nav">
      <header className = "site-header">
      <Link className = "home-page" to = "/home">
      <img className="App-logo" src={logo}></img></Link> 
        <nav>
          <div>
          <ul className="navItems">
            <li><Link to="/Home">Home</Link></li>
            <li><a>Orders</a></li>
            <li><a>Menus</a></li>
            <li><a>Discussion</a></li>
            <li><Link className="login" to="/Login">Login</Link></li>
          </ul>
          </div>
        </nav>
        
      </header>
     
      </div>
    );
}
export default navigationBar;