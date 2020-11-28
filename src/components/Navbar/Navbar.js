import React from 'react';
import '../../App.css';
import logo from '../../images/logoforschool.png';
import { Link} from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext"

export default function NavigationBar(){
  const currentUser = useAuth();
    
  
  
  
  return(
    <div>
      {/* <header className = "site-header"> */}
      {/* <Link className = "home-page" to = "/home">
      <img className="App-logo" src={logo} alt = "The Golden Experience Logo"></img></Link>  */}
        {/* <nav>
          <div>
          <ul className="navItems">
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/">Orders</Link></li>
            <li><Link to="/">Menus</Link></li>
            <li><Link to="/">Discussion</Link></li>
            {currentUser.email !== undefined ?
            <li><Link className="profilepage" to="/Profile">Profile</Link></li>:
            <li><Link className="login" to="/LoginV2">Login</Link></li>
            }
            </ul>
            
          </div>
        </nav> */}
      <nav className="navbar navbar-expand-md nav">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className = "home-page" to = "/home">
                  <img className="App-logo" src={logo} alt = "The Golden Experience Logo"></img></Link> 
                </li>
            </ul>
        </div>
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2" >
            <ul className="navbar-nav ml-auto navItems ">
              <li className= "nav-item navItems" ><Link classname = "navItems" to="/Home">Home</Link></li>&emsp;&emsp;
              <li className= "nav-item" ><Link to="/">Orders</Link></li>&emsp;&emsp;
              <li className= "nav-item" ><Link to="/">Menus</Link></li>&emsp;&emsp;
              <li className= "nav-item" ><Link to="/">Discussion</Link></li>&emsp;&emsp;
              {currentUser.email !== undefined ?
              <li className= "nav-item" ><Link className="profilepage" to="/Profile">Profile</Link></li>:
              <li className= "nav-item" ><Link className="login" to="/LoginV2">Login</Link></li>}&emsp;&emsp;
            </ul>
        </div>
    </nav>
        
      {/* </header> */}
     
      </div>
    );
}
