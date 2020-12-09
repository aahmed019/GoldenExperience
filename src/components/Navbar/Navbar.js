import React, { useState } from 'react';
import '../../App.css';
import logo from '../../images/logoforschool.png';
import { Link} from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext"
import Fire from '../../firebaseConfig';

export default function NavigationBar(){
  const { currentUser } = useAuth()  
  let database = Fire.db
  const [position, setPosition] = useState("");


  async function checkStaff(){
  if(currentUser !== null){
      await database.getCollection('Staff').doc(currentUser.email).get().then(function(doc){
        if(doc.exists){
          setPosition(doc.data().Position);        
        }
        else{console.log('no doc found')}
      })
    }
  }
  if(currentUser === null){
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
                        <li className= "nav-item" ><Link className="login" to="/LoginV2">Login</Link></li>&emsp;&emsp;
                      </ul>
                  </div>
                </nav>    
              </div>
            );
  }else if(checkStaff() && position == "Manager"){
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
                      <li className= "nav-item" ><Link to="/Order">Order</Link></li>&emsp;&emsp;
                      <li className= "nav-item" ><Link to="/Deposit">Deposit</Link></li>&emsp;&emsp;
                      <li className= "nav-item" ><Link to="/Discussion">Discussion</Link></li>&emsp;&emsp;
                      <li className= "nav-item" ><Link to="/Complaint">Complaint</Link></li>&emsp;&emsp;
                      <li className= "nav-item" ><Link to="/DeliveryPage">Delivery</Link></li>&emsp;&emsp;
                      <li className= "nav-item" ><Link to="/Chef">Chef</Link></li>&emsp;&emsp;
                      <li className= "nav-item" ><Link to="/Manager">Managing</Link></li>&emsp;&emsp;
                      <li className= "nav-item" ><Link className="profilepage" to="/Profile">Profile</Link></li>&emsp;&emsp;
                    </ul>
                </div>
              </nav>    
            </div>
          )
  }else if(checkStaff() && position == 'Chef'){
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
                      <li className= "nav-item" ><Link to="/Order">Order</Link></li>&emsp;&emsp;
                      <li className= "nav-item" ><Link to="/Deposit">Deposit</Link></li>&emsp;&emsp;
                      <li className= "nav-item" ><Link to="/Discussion">Discussion</Link></li>&emsp;&emsp;
                      <li className= "nav-item" ><Link to="/Complaint">Complaint</Link></li>&emsp;&emsp;
                      <li className= "nav-item" ><Link to="/Chef">Chef</Link></li>&emsp;&emsp;
                      <li className= "nav-item" ><Link className="profilepage" to="/Profile">Profile</Link></li>&emsp;&emsp;
                    </ul>
                </div>
              </nav>    
            </div>
          )
  }else if(checkStaff() && position == 'Driver'){
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
                <li className= "nav-item" ><Link to="/Order">Order</Link></li>&emsp;&emsp;
                <li className= "nav-item" ><Link to="/Deposit">Deposit</Link></li>&emsp;&emsp;
                <li className= "nav-item" ><Link to="/Discussion">Discussion</Link></li>&emsp;&emsp;
                <li className= "nav-item" ><Link to="/Complaint">Complaint</Link></li>&emsp;&emsp;
                <li className= "nav-item" ><Link to="/DeliveryPage">Delivery</Link></li>&emsp;&emsp;
                <li className= "nav-item" ><Link className="profilepage" to="/Profile">Profile</Link></li>&emsp;&emsp;
              </ul>
          </div>
        </nav>    
      </div>
    )
}else{
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
                <li className= "nav-item" ><Link to="/Order">Order</Link></li>&emsp;&emsp;
                <li className= "nav-item" ><Link to="/Deposit">Deposit</Link></li>&emsp;&emsp;
                <li className= "nav-item" ><Link to="/Discussion">Discussion</Link></li>&emsp;&emsp;
                <li className= "nav-item" ><Link to="/Review">Review</Link></li>&emsp;&emsp;
                <li className= "nav-item" ><Link to="/Complaint">Complaint</Link></li>&emsp;&emsp;
                <li className= "nav-item" ><Link className="profilepage" to="/Profile">Profile</Link></li>&emsp;&emsp;
              </ul>
          </div>
        </nav>    
      </div>
    );
  }
}
