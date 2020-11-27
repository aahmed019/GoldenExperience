import React from 'react';
import './App.css';
import Nav from './components/Navbar/Navbar.js'
import Login from './components/Login/Login.js';
import LandingPage from './components/LandingPage/Landingpage.js'
import { HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import SignUp from './components/SignUp/Signup';
import ConfirmationPage from './components/ConfirmationPage/ConfirmationPage.js'
import DiscussionPage from './components/DiscussionPage/DiscussionPage';
import Posts from './components/Posts/Posts';
import ChefPage from './components/ChefPage/ChefPage';
import ManagerPage from './components/Manager/Manager';
import ProfilePage from './components/ProfilePage/ProfilePage';
import CommentSection from './components/CommentSection/CommentSection';

function App() {
  return (
    
    <div>
    <Router>
    <div>
      <Nav/> {/* Navigation component, the file directory for this is located above, every component will follow this format*/}
      <div>
      <Switch>
            <Route exact path="/" component={() => (<Redirect to='/Home' />)} />
            <Route exact path = '/Login' component = {Login}/>
            <Route exact path = '/Home' component = {LandingPage}/>
            <Route exact path = '/Register' component = {SignUp}/>
            <Route exact path = '/Confirmation' component = {ConfirmationPage}/>
            <Route exact path = '/Discussion' component = {DiscussionPage}/>
            <Route exact path = '/Posts' component = {Posts}/>
            {/* <Route exact path = '/home' component = {}/> */}
            <Route exact path = '/Chef' component={ChefPage}/>
            <Route exact path = '/Manager' component={ManagerPage}/>
            <Route exact path = '/Profile' component ={ProfilePage}/>
            <Route exact path = '/Comments' component={CommentSection}/>
      </Switch>
      </div>
    </div>
    </Router>

    </div>
  );
}

export default App;
