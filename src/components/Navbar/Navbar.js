import React, { Fragment } from 'react';
import '../../App.css';
import logo from '../../images/logoforschool.png';
import { Link} from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext"

export default function NavigationBar(){
  const { currentUser } = useAuth()  
  
  console.log(currentUser);
  
  return(
    <div>
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
              <li className= "nav-item navItems" ><Link className = "navItems" to="/Home">Home</Link></li>&emsp;&emsp;
              
              <li className= "nav-item" ><Link to="/Menu">Menus</Link></li>&emsp;&emsp;
              <li className= "nav-item" ><Link to="/Fooditems">Food</Link></li>&emsp;&emsp;

              {currentUser ===  null ?
              <li className= "nav-item" ><Link className="login" to="/LoginV2">Login</Link></li>:
              <Fragment>
              <li className= "nav-item" ><Link to="/Order">Order</Link></li>&emsp;&emsp;
              <li className= "nav-item" ><Link to="/Deposit">Deposit</Link></li>&emsp;&emsp;
              <li className= "nav-item" ><Link to="/Discussion">Discussion</Link></li>&emsp;&emsp;
              <li className= "nav-item" ><Link to="/Review">Review</Link></li>&emsp;&emsp;
              <li className= "nav-item" ><Link className="profilepage" to="/Profile">Profile</Link></li>&emsp;&emsp;

              </Fragment>
            }&emsp;&emsp;
            </ul>
        </div>
    </nav>
        
      {/* </header> */}
     
      </div>
    );
}
