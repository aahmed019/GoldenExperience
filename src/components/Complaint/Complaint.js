import React, { Component, useEffect, useState } from 'react';
import Footer from '../Footer/Footer.js'
import {Link} from 'react-router-dom';
import {Row} from "react-bootstrap";
import './Complaint.css'
import queryString from 'query-string'
import Fire from '../../firebaseConfig';

export default function ComplaintPage(props){
    const[showComplimentForm, setShowComplimentForm] = useState('none')
    const[showComplaintForm, setShowComplaintForm] = useState('none') //assign to setShowComplaintForm(*here*) to change
    
    let fire = Fire.db

    const value = queryString.parse(props.location.search);
    const usertype = value.usertype;
    const username = value.username;
    console.log(usertype);
    console.log(username);
    if(usertype === "manager"){
        var indents = [];
        for (var i = 0; i < 10; i++) {
            indents.push(<h1 className='indent' key={i}>some shit that got pushed</h1>);
        }
        return (
        <div>
            {indents}
            "Some text value"
        </div>
        )
    }else{
        return(
            <div>
            <div className ='background-boi'>
                <div className = "container">
                    <div class="row" style = {{backgroundColor: "green"}}>
                        <div class="column" style = {{backgroundColor: "blue"}} >
                            <h2>Submit Compliment</h2>
                            <form>
                                <h3>Order Number</h3>
                                <input type="text" OrderSearhCompliment="OrderSearhCompliment"/>
                                <input type="button" id="OrderSearhComplimentExecute" value="Search" onClick = {() =>setShowComplaintForm('block')}/><br></br>
                                <select name="complimentTo" id="complimentTo">
                                    <option value="chef">Compliment Chef on this order</option>
                                    <option value="driver">Compliment Driver on this order</option>
                                </select>
                                <h3>Title</h3>
                                <input type="text" complimentTitle="complimentTitle"/>
                                <h3>Description</h3>
                                <input type="text" class="submissionfield" complimentDescription="complimentDescription"/>
                            </form>
                        </div>
                        <div class="column" style = {{backgroundColor: "purple", display: showComplaintForm}} >
                            <h2>Submit Complaint</h2>
                            <form>
                                <h3>Order Number</h3>
                                <input type="text" orderSearchComplaint="orderSearchComplaint"/>
                                <input type="button" id="orderSearchComplaintExecute" value="Search"/><br></br>
                                <select name="complaintAbout" id="complaintAbout">
                                    <option value="chef">Complaint about the Chef on this order</option>
                                    <option value="driver">Complaint about the Driver on this order</option>
                                    <option value="customer">Complaint about the Customer on this order</option>
                                </select>
                                <h3>Title</h3>
                                <input type="text" complaintTitle="complaintTitle"/>
                                <h3>Description</h3>
                                <input type="text" class="submissionfield" complaintDescription="complaintDescription"/>
                            </form>
                        </div>
                    </div>
                    <div style = {{backgroundColor: "red"}}>
                            <h1 style = {{verticalAlign: "top"}}>Display active complaint threads here</h1>
                    </div>
                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}