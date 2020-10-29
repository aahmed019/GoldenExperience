import React from 'react';
import '../../App.css';
import logo from '../../images/logoforschool.png';
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