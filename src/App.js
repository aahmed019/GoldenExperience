import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.js'
import LandingPage from './components/LandingPage/Landingpage.js'
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import SignUp from './components/SignUp/Signup';
import ConfirmationPage from './components/ConfirmationPage/ConfirmationPage.js'
import ChefPage from './components/ChefPage/ChefPage';
import ManagerPage from './components/Manager/Manager';
import ProfilePage from './components/ProfilePage/ProfilePage';
import SignUpV2 from './components/SignUpV2/SignUpV2';
import { AuthProvider } from './contexts/AuthContext';
import LoginV2 from './components/LoginV2/LoginV2';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import CommentSection from './components/CommentSection/CommentSection';
import OrderPage from './components/OrderPage/OrderPage';
import Deposit from './components/Deposit/Deposit';
import DiscussionPage from './components/DiscussionPage/DiscussionPage';
import Menu from './components/Menu/Menu';
import Posts from './components/Posts/Posts';
import Complaint from './components/Complaint/Complaint';
import FoodItemView from './components/FoodItemView/FoodItemView';


function App() {
  return (
    <AuthProvider>
    <div>
    <Router>
    <div>
      <Navbar/> {/* Navigation component, the file directory for this is located above, every component will follow this format*/}
      <div>
        
        {/* <Container className = "d-flex align-items-center justify-content-center" style ={{minHeight: "100vh"}}>
          <div className ="w-100" style = {{ maxWidth: '400px'}}>
            <SignUpV2/>
          </div>
        </Container> */}
        <AuthProvider>
        <Switch>
              <PrivateRoute exact path = "/Profile" component = {ProfilePage}/>
              <PrivateRoute path = "/UpdateProfile" component = {UpdateProfile}/>
              <Route exact path="/" component={() => (<Redirect to='/Home' />)} />
              <Route exact path = '/LoginV2' component = {LoginV2}/>
              <Route exact path = '/Home' component = {LandingPage}/>
              <Route exact path = '/Register' component = {SignUp}/>
              <Route exact path = '/Confirmation' component = {ConfirmationPage}/>
              <Route exact path = '/Order' component = {OrderPage}/>
              <Route exact path = '/Chef' component={ChefPage}/>
              <Route exact path = '/Manager' component={ManagerPage}/>
              <Route exact path = '/Profile' component ={ProfilePage}/>
              <Route exact path = '/SignUpV2' component = {SignUpV2}/>
              <Route path = "/forgot-password" component = {ForgotPassword}/>
              <Route exact path = '/Comments' component={CommentSection}/>
              <Route exact path = '/Deposit' component = {Deposit}/>
              <Route exact path = '/Discussion' component = {DiscussionPage}/>
              <Route exact path = '/Menu' component = {Menu}/>
              <Route exact path = '/Posts' component = {Posts}/>
              <Route exact path = '/Complaint' component = {Complaint}/>
              <Route exact path = '/FoodItems' component = {FoodItemView}/>

              
        </Switch>
        </AuthProvider>
      </div>
    </div>
    </Router>

    </div>
    </AuthProvider>
  );
}

export default App;
