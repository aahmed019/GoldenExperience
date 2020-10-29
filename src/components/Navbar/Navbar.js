import React from 'react';
import '../../App.css';
import logo from '../../images/logoforschool.png';
import { Link} from 'react-router-dom';
function navigationBar(){
    return(
    <div className="nav">
      <header class = "site-header">
      <Link classname = "home-page" to = "/home">
      <img className="App-logo" src={logo}></img></Link> 
        <nav>
          <div>
          <ul className="navItems">
            <li><a>Orders</a></li>
            <li><a>Test</a></li>
            <li><a>Menus</a></li>
            <li><Link className="login" to="/Login"><button>Login</button></Link></li>
          </ul>
          </div>
        </nav>
        
      </header>
     
      </div>
    );
}
export default navigationBar;