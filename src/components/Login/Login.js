import React, { Component } from 'react';
import {Row, Col} from "react-bootstrap";
import './Login.css'
import {Link} from 'react-router-dom';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    validateForm(){
        //checks if password and user are correct
    }

    render(){
        return(
            <div className ='background-boi'>
                <div className = "container">
                    <div className = "login-box">
                        <Row>
                            <Col md = {12} lg= {12}>
                                <div className ="login-title">Login</div>
                            </Col>
                            <Col md = {12} lg= {12}>
                                <div className = "user">Username *<br/></div>
                                <input className="login-input-field" value ={this.state.value} onChange={this.handleChange} />
                            </Col>
                            <Col md = {12} lg= {12}>
                                <div className = "password">Password *<br/></div>
                                <input className="login-input-field" value ={this.state.value} onChange={this.handleChange} />
                            </Col>
                            <Col md = {12} lg= {12}>
                                <button className = "sign-in" disabled={!this.validateForm()}><Link to ={{pathname: "/" }}>Sign in </Link></button>&nbsp;&nbsp;
                                <button className ="sign-up"><Link to ={{pathname: "/" }} >Sign Up</Link><br/></button>
                            </Col>
                
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;