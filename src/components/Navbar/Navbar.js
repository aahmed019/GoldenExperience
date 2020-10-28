import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import { Link} from 'react-router-dom';
function navigationBar(){
    return(
    <div className="nav">
      <header>
      <img className="App-logo" src={logo}></img>
        <nav>
          <ul className="navItems">
            <li><a>Orders</a></li>
            <li><a>Test</a></li>
            <li><a>Menus</a></li>
          </ul>
        </nav>
        <Link className="login" to="/Login"><button>Login</button></Link>
        
      </header>
     
      </div>
    );
}
export default navigationBar;