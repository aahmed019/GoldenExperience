import React, { Component } from 'react';
import {Row} from "react-bootstrap";
import './SignUp.css'
import {Link} from 'react-router-dom';
import Footer from '../Footer/Footer.js'
import Fire from '../../firebaseConfig';

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            fullName: '', 
            passw: '',
            email: '',
            validlogin: false,
        }
            this.db = Fire.db
    }
    

    handleInputChange = (changedState) => {
        this.setState(changedState);
    }

    //This is to push values to the database
    SignUp(){
        //all or some fields are empty
    if(this.state.user === ''| this.state.passw === '' | this.state.fullName === ''| this.state.email === ''){
    alert('One or more fields are empty! Please fill it out')
    }
    else{
    this.db.getCollection('SignUp').doc().set({
        username: this.state.user,
        password: this.state.passw,
        name: this.state.fullName,
        email: this.state.email,
        })
        .then(function() {// went through
            console.log("Document successfully written!");
            
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error writing document: ", error);
        });
    }
}

    render(){
        const { email, passw, user, fullName } = this.state;
        const enabled =
        email.length > 0 &&
        passw.length > 0 && 
        user.length > 0 && 
        fullName.length >0;
        console.log(this)
        return(
            <div>
            <form className = "background-boi">
                <div className ="container">
                    <div className= "register-box">
                    <Row >
                            <Row md = {12} lg= {12} className = "first-set">
                                <div className ="signup-title">Sign-up</div><br></br>
                            </Row>
                            <Row md = {12} lg= {12} className = "second-set">
                                <div className = "user">Username<br/></div>
                                <input className = "user-input"
                                type = "text"
                                onChange={(e) =>{
                                    let newValue = e.target.value;
                                    this.handleInputChange({user: typeof newValue !== undefined ? String(newValue): ''})
                                }}
                                placeholder="Enter Username here"/>
                                
                            </Row>
                            <Row md = {12} lg= {12} className = "second-set">
                                <div className = "user">Password<br/></div>
                                <input className = "user-input"
                                type = "text"
                                onChange={(e) =>{
                                    let newValue = e.target.value;
                                    this.handleInputChange({passw: typeof newValue !== undefined ? String(newValue): ''})
                                }}
                                placeholder="Enter Password here"/>
                            </Row>
                            <Row md = {12} lg= {12} className = "second-set">
                                <div className = "user">Full Name<br/></div>
                                    <input className = "user-input"
                                    type = "text"
                                    onChange={(e) =>{
                                        let newValue = e.target.value;
                                        this.handleInputChange({fullName: typeof newValue !== undefined ? String(newValue): ''})
                                    }}
                                    placeholder="Enter Full Name here"/>   
                            </Row>
                            <Row md = {12} lg= {12} className = "second-set">
                                <div className = "user">Email<br/></div>
                                    <input className = "user-input"
                                    type = "email"
                                    onChange={(e) =>{
                                        let newValue = e.target.value;
                                        this.handleInputChange({email: typeof newValue !== undefined ? String(newValue): ''})
                                    }}
                                    placeholder="Enter Email here"/>   
                            </Row>
                            <Row md = {12} lg= {12} className = "first-set">
                                <div className ="reg-button">
                                    <button className = "button-options" onClick ={() => {this.SignUp()}} disabled={!enabled}> 
                                    <Link to ={enabled ? "/Confirmation": '#' } onClick = {() => {this.SignUp()}}>Register Now!</Link>
                                    </button>
                                </div>
                            </Row>
                        </Row>
                
                    </div>

                </div>
                
            </form>
            <Footer/>
            </div>
        )
    }

}
export default SignUp;