import React, { Component } from 'react';
import {Row} from "react-bootstrap";
import './SignUp.css'
import {Link} from 'react-router-dom';
import Footer from '../Footer/Footer.js'

class SignUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            fullName: '', 
            passw: '',
            email: '',
            validlogin: false}
    }

    handleInputChange = (changedState) => {
        this.setState(changedState);
    }

    render(){
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
                                    type = "text"
                                    onChange={(e) =>{
                                        let newValue = e.target.value;
                                        this.handleInputChange({email: typeof newValue !== undefined ? String(newValue): ''})
                                    }}
                                    placeholder="Enter Email here"/>   
                            </Row>
                            <Row md = {12} lg= {12} className = "first-set">
                                <div className ="reg-button">
                                    <button className = "button-options"><Link to ={{pathname: "/Confirmation" }} >Register Now!</Link></button>
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