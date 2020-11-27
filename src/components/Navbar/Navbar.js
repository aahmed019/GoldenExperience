import React from 'react';
import '../../App.css';
import logo from '../../images/logoforschool.png';
import { Link} from 'react-router-dom';
function navigationBar(){
    return(
    <div className="nav">
      <header className = "site-header">
      <Link className = "home-page" to = "/home">
      <img className="App-logo" src={logo} alt = "The Golden Experience Logo"></img></Link> 
        <nav>
          <div>
          <ul className="navItems">
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/OrderPage">Orders</Link></li>
            <li><Link to="/">Menus</Link></li>
            <li><Link to="/Discussion">Discussion</Link></li>
            <li><Link className="login" to="/Login">Login</Link></li>
          </ul>
          </div>
        </nav>
        
      </header>
     
      </div>
    );
}
export default navigationBar;