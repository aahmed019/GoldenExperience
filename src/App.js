import React from 'react';
import './App.css';
import Nav from './components/Navbar/Navbar.js'
import Login from './components/Login/Login.js';
import LandingPage from './components/LandingPage/Landingpage.js'
import { HashRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Footer from './components/Footer/Footer.js'

function App() {
  return (
    <div>
    <Router>
    <div>
      <Nav/> {/* Navigation component, the file directory for this is located above, every component will follow this format*/}
      <div>
      <Switch>
            <Route exact path = '/Login' component = {Login}/>
            <Route exact path = '/Home' component = {LandingPage}/>
            
            {/* <Route exact path = '/home' component = {}/> */}
      </Switch>
      </div>
    </div>
    </Router>

    </div>
  );
}

export default App;
