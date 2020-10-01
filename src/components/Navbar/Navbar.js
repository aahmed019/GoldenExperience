import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

function navigationBar(){
    return(
    <div className="nav">
      <header>
      <img className="App-logo" src={logo}></img>
        <nav>
          <ul className="navItems">
            <li><a>Orders</a></li>
            <li><a>Test</a></li>
            <li><a>Login</a></li>
          </ul>
        </nav>
        <a className="login" href="#"><button>Login</button></a>
      </header>
     
      </div>
    );
}
export default navigationBar;