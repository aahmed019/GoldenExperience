import React, { Component } from 'react';
import Footer from '../Footer/Footer.js'
import {Link} from 'react-router-dom';
import {Row} from "react-bootstrap";
import './ComplaintPage.css'

class ComplaintPage extends Component{

    render(){
        console.log(this.state)
        return(
            <div>
            <div className ='background-boi'>
                <div className = "container">
                    <div className = "complaint-form">
                        {/* <Row>
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
                                <button className ="sign-up" onClick={() => {this.getMarker()} } style={{color:"red"}}>test</button>
                            </Col>
                        </Row> */}
                        <form>
                            <label for="title">Title</label><br></br>
                            <input type="text" id="title" name="title"></input><br></br>
                            <label for="complain">Complain</label><br></br>
                            <input type="text" id="complain" name="complain"></input><br></br>
                            <input type="submit" value="Submit"></input>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}
export default ComplaintPage