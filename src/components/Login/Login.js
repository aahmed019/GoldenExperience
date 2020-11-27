import React, { Component } from 'react';
import {Row, Col} from "react-bootstrap";
import './Login.css'
import {Link} from 'react-router-dom';
import Footer from '../Footer/Footer.js'
import Fire from '../../firebaseConfig';
import { getQueriesForElement } from '@testing-library/react';
import ProfilePage from '../ProfilePage/ProfilePage';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: '', 
            passw: '', 
            validlogin: false};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleChangepassw = this.handleChangepassw.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.db = Fire.db
      }

    handleClick(e){
        console.log(e)
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleChangepassw(event) {
        this.setState({passw: event.target.value});
    }
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    
    validateForm(user, pass){
        //checks if password and user are correct
        // console.log('testing', this.state.value , user)
        if(this.state.value == user && this.state.passw == pass){
            return true;
        }
        else{
            return false;
        }


        
    }
    
    //For manager 
    async getMarker() {
        const snapshot = await this.db.getCollection('SignUp').get()
        console.log(snapshot.docs.map(doc => doc.data()))
    }

    //shitty attempt at gettingusers 
    // getUsers(doc){
    //     let li= {};
    //     let userLogin = {};
    //     let passLogin = {};

    //     //li.setAttribute('data-id', doc.id);
    //     userLogin = doc.data().username;
    //     passLogin = doc.data().password;
    //     // console.log("this is the user",userLogin);
    //     // console.log("this is the pass",passLogin);

    //     this.validateForm(userLogin, passLogin);

    // }

    signIn(){
        this.db.getCollection('Users').get().then((snapshot) => {
            let userLogin = this.state.value;
            let passLogin = this.state.passw;
                // console.log("this is the username: ", snapshot.docs[1].data().username)
                
                for(let i = 0; i < snapshot.docs.length; i++){
                    let index = snapshot.docs[i]
                    if(userLogin == index.data().username){
                        console.log("success c:")
                        if(passLogin == index.data().password){
                            console.log("password correct");
                            this.state.validlogin = true;
                            break;
                        }
                        else{
                            console.log("wrong password")
                            alert('Wrong password, please try again.')
                            break;
                        }
                    }
                    else{
                        console.log("wrong credentials")
                        alert('Wrong username, please try again.')
                        break;
                    }
                }
                
                
            
        })
    }
    // getUserByUser(value) {
    //     // Make the initial query
    //     const query = this.db.getCollection('Users').where('username', '==', value).get();
      
    //      if (!query.empty) {
    //       const snapshot = query.docs[0];
    //       const data = snapshot.data();
    //       console.log(data);
      
    //     } else {
    //       // not found
    //     }
    //   }


    render(){
        //this.getUserByUser(this.state.value);
        
        return(
            <div>
                <div className ='background-boi'>
                    <div className = "container">
                        <div className = "login-box">
                            <Row>
                                <Col md = {12} lg= {12}>
                                    <div className ="login-title">Login</div><br></br>
                                </Col>
                                <Col md = {12} lg= {12}>
                                    <div className = "user">Username*<br/></div>
                                    <input type = "user-input" className="login-input-field" value ={this.state.value} onChange={this.handleChange} />
                                </Col>
                                <Col md = {12} lg= {12}>
                                    <div className = "password">Password *<br/></div>
                                    <input type = "password-input" className="login-input-field" passw ={this.state.passw} onChange={this.handleChangepassw} />
                                </Col>
                                <Col md = {12} lg= {12}>
                                    <button className = "sign-in">
                                        <Link to ={!this.state.validlogin ? "/": '#' } onClick = {() => {this.signIn()}}>Sign in </Link></button>&nbsp;&nbsp;
                                    <button className ="sign-up" style={{color:"white"}}><Link to ={{pathname: "/Register" }} >Sign Up</Link><br/></button>
                                    {/* <button className ="sign-up" onClick={() => {this.getMarker()} } style={{color:"red"}}>test</button> */}
                                </Col>
                    
                            </Row>
                        </div>
                    </div>
            </div>
            
            <Footer/>
            </div>
        )
    }
}
export default Login;