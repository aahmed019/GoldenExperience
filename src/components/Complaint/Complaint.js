import React, { Component, useEffect, useState } from 'react';
import Footer from '../Footer/Footer.js'
import {Link} from 'react-router-dom';
import {Figure, Row} from "react-bootstrap";
import './Complaint.css'
import queryString from 'query-string'
import Fire from '../../firebaseConfig';
import { useAuth } from '../../contexts/AuthContext.js';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { setConfiguration } from 'react-grid-system';

toast.configure()

export default function Complaint(props){
    const[showComplimentForm, setShowComplimentForm] = useState('none')
    const[showComplaintForm, setShowComplaintForm] = useState('none')
    const[items, setItems] = useState([])
    const[complaintAgainstUser, setComplaintAgainstUser] = useState([])
    const[orders, setOrders] = useState([])
    const{currentUser} = useAuth()
    const value = queryString.parse(props.location.search);
    const usertype = value.usertype;
    const username = value.username;
    
    console.log(currentUser.username)

    let fire = Fire.db

    const getOrders = async() => {
        const tempOrders = []
        fire.getCollection('Orders').get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                let data = doc.data()
                tempOrders.push(data)                
            })
            setOrders(tempOrders)
        }).catch(function(error){
            console.log(error)
        })
    }
    
    const getComplaintsAgainst = async() => {
        const tempAgainst = []
        fire.getCollection('Compls').where('complainee', '==', String(currentUser.email)).get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                let data = doc.data()
                tempAgainst.push(data)
            })
            setComplaintAgainstUser(tempAgainst)
        }).catch(function(error){
            console.log(error)
        })
    }

    useEffect(() =>{
        getOrders()
        getComplaintsAgainst()
    },[])

    const findOrderForCompliment = () => {
        var orderToGet = document.getElementById("OrderSearhCompliment").value
        var orderFound = false
        orders.forEach(order => {
            if(String(order.total) === String(orderToGet) && String(order.user) === String(currentUser.email)){
                orderFound = true
            }})
        if(orderFound){
            setShowComplimentForm('block')
        }else{
            toast('invalid order')
        }
    }

    
    const findOrderForComplaint = () => {
        var orderToGet = document.getElementById("orderSearchComplaint").value
        var orderFound = false
        const tempItems = []
        orders.forEach(order => {
            if(String(order.total) === String(orderToGet) && String(order.user) === String(currentUser.email)){
                orderFound = true
                order.items.forEach(item => {
                    if(String(item.id[0]) === "m"){
                        fire.getCollection('Food').where('id', '==', String(item.id)).get().then(querySnapshot => {
                            querySnapshot.docs.forEach(doc => {
                                let data = doc.data()
                                tempItems.push([item.id, data.name])
                            })
                        }).catch(function(error){
                            console.log(error)
                        })
                    }else{
                        fire.getCollection('Drink').where('id', '==', String(item.id)).get().then(querySnapshot => {
                            querySnapshot.docs.forEach(doc => {
                                let data = doc.data()
                                tempItems.push([item.id, data.name])
                            })
                        }).catch(function(error){
                            console.log(error)
                        })
                    }
                })
            }
        })
        setItems(tempItems)
        if(orderFound){
            setShowComplaintForm('block')
        }else{
            toast('invalid order')
        }
    }

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
                            <h3>Order Number</h3>
                                <input type="text" id="OrderSearhCompliment"/>
                                <input type="button" id="OrderSearhComplimentExecute" value="Search" onClick = {findOrderForCompliment}/><br></br>
                            <form style = {{display: showComplimentForm}}>
                                <select name="complimentTo" id="complimentTo">
                                    <option value="chef">Compliment Chef on this order</option>
                                    <option value="driver">Compliment Driver on this order</option>
                                </select>
                                <h3>Title</h3>
                                <input type="text" id="complimentTitle"/>
                                <h3>Description</h3>
                                <input type="text" class="submissionfield" id="complimentDescription"/>
                            </form>
                        </div>
                        <div class="column" style = {{backgroundColor: "purple"}} >
                            <h2>Submit Complaint</h2>
                            <h3>Order Number</h3>
                            <input type="text" id="orderSearchComplaint"/>
                            <input type="button" id="orderSearchComplaintExecute" value="Search" onClick = {findOrderForComplaint}/><br></br>
                            <form style = {{display: showComplaintForm}}>
                                <select name="complaintAbout" id="complaintAbout">
                                    {items.map(function(item, i){
                                        return <option key={i} value={item[i][0]}>Complaint about the {item[i][1]} on this order</option>
                                    })}
                                    <option value="driver">Complaint about the Driver on this order</option>
                                    <option value="customer">Complaint about the Customer on this order</option>
                                </select>
                                <h3>Title</h3>
                                <input type="text" id="complaintTitle"/>
                                <h3>Description</h3>
                                <input type="text" class="submissionfield" id="complaintDescription"/>
                            </form>
                        </div>
                    </div>
                    <div>
                    <h2>Complaints Against {currentUser.name}</h2>
                        {complaintAgainstUser.map(function(complaint, i){
                            console.log(complaint)
                            return <div key={i}>
                                <h3>Title: {complaint.Title}</h3>
                                <h3>Description: </h3>
                                <p>{complaint.Description}</p><br></br>
                                <button onClick = {() => toast('does nothing rn')}>dispute</button>
                            </div>
                        })}
                    </div>
                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}