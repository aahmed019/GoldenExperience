import React from 'react';
import './App.css';
import Nav from './components/Navbar/Navbar.js'
import Login from './components/Login/Login.js';
import LandingPage from './components/LandingPage/Landingpage.js'
import { HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import SignUp from './components/SignUp/Signup';
import ConfirmationPage from './components/ConfirmationPage/ConfirmationPage.js'
import ChefPage from './components/ChefPage/ChefPage';
import ManagerPage from './components/Manager/Manager';
import ProfilePage from './components/ProfilePage/ProfilePage';
import SignUpV2 from './components/SignUpV2/SignUpV2';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
    <div>
    <Router>
    <div>
      <Nav/> {/* Navigation component, the file directory for this is located above, every component will follow this format*/}
      <div>
        
        <Container className = "d-flex align-items-center justify-content-center" style ={{minHeight: "100vh"}}>
          <div className ="w-100" style = {{ maxWidth: '400px'}}>
            <SignUpV2/>
          </div>
        </Container>
        
        <Switch>
              {/* <Route exact path="/" component={() => (<Redirect to='/Home' />)} /> */}
              <Route exact path = '/Login' component = {Login}/>
              <Route exact path = '/Home' component = {LandingPage}/>
              <Route exact path = '/Register' component = {SignUp}/>
              <Route exact path = '/Confirmation' component = {ConfirmationPage}/>
              <Route exact path = '/Chef' component={ChefPage}/>
              <Route exact path = '/Manager' component={ManagerPage}/>
              <Route exact path = '/Profile' component ={ProfilePage}/>
              <Route exact path = '/SignUpV2' component = {SignUpV2}/>
        </Switch>
      </div>
    </div>
    </Router>

    </div>
    </AuthProvider>
  );
}

export default App;
