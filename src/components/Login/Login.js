import React, { Component } from 'react';
import {Row, Col} from "react-bootstrap";
import './Login.css'
import {Link} from 'react-router-dom';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import Footer from '../Footer/Footer.js'

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {value: '', passw: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleChangepassw = this.handleChangepassw.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleChangepassw(event) {
        this.setState({passw: event.target.passw});
    }
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    
    validateForm(){
        //checks if password and user are correct
    }

    render(){
        console.log(this.state)
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
                                <div className = "user">Username *<br/></div>
                                <input type = "user-input" className="login-input-field" value ={this.state.value} onChange={this.handleChange} />
                            </Col>
                            <Col md = {12} lg= {12}>
                                <div className = "password">Password *<br/></div>
                                <input type = "password-input" className="login-input-field" passw ={this.state.passw} onChange={this.handleChangepassw} />
                            </Col>
                            <Col md = {12} lg= {12}>
                                <button className = "sign-in" disabled={!this.validateForm()}><Link to ={{pathname: "/" }}>Sign in </Link></button>&nbsp;&nbsp;
                                <button className ="sign-up" style={{color:"white"}}><Link to ={{pathname: "/" }} >Sign Up</Link><br/></button>
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