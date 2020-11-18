import React, { Component } from 'react';
import {Row, Col} from "react-bootstrap";
import './Login.css'
import {Link} from 'react-router-dom';
import Footer from '../Footer/Footer.js'
import Fire from '../../firebaseConfig';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {value: '', passw: '', validlogin: false};
    
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
    
    validateForm(){
        //checks if password and user are correct
        
    }
    
    //For manager 
    async getMarker() {
        const snapshot = await this.db.getCollection('SignUp').get()
        console.log(snapshot.docs.map(doc => doc.data()))
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
                                <div className = "user">Username*<br/></div>
                                <input type = "user-input" className="login-input-field" value ={this.state.value} onChange={this.handleChange} />
                            </Col>
                            <Col md = {12} lg= {12}>
                                <div className = "password">Password *<br/></div>
                                <input type = "password-input" className="login-input-field" passw ={this.state.passw} onChange={this.handleChangepassw} />
                            </Col>
                            <Col md = {12} lg= {12}>
                                <button className = "sign-in" disabled={!this.validateForm()}><Link to ={{pathname: "/" }}>Sign in </Link></button>&nbsp;&nbsp;
                                <button className ="sign-up" style={{color:"white"}}><Link to ={{pathname: "/Register" }} >Sign Up</Link><br/></button>
                                <button className ="sign-up" onClick={() => {this.tryingNew()} } style={{color:"red"}}>test</button>
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