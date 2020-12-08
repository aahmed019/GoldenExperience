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

export default function Complaint(){
    const[showComplimentForm, setShowComplimentForm] = useState('none')
    const[showComplaintForm, setShowComplaintForm] = useState('none')
    const[items, setItems] = useState([])
    const[complaintAgainstUser, setComplaintAgainstUser] = useState([])
    const[orders, setOrders] = useState([])
    const[userVIP, setUserVIP] = useState(false)
    const[complainee, setComplainee] = useState("")
    const{currentUser} = useAuth()

    let fire = Fire.db

    const getOrders = async() => {
        const tempOrders = []
        fire.getCollection('Orders').where('user', '==', String(currentUser.email)).get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                let currentID = doc.id
                let data = { ...doc.data(), ['orderID']: currentID}
                tempOrders.push(data)         
            })
            setOrders(tempOrders)
        }).catch(function(error){
            console.log(error)
        })
    }
    
    const getComplaintsAgainst = async() => {
        const tempAgainst = []
        fire.getCollection('Compls').where('Complainee', '==', String(currentUser.email)).get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                let currentID = doc.id
                let data = {...doc.data(), ['id']: currentID}
                tempAgainst.push(data)
            })
            setComplaintAgainstUser(tempAgainst)
        }).catch(function(error){
            console.log(error)
        })
    }
    
    const isThisUserVIP = async() => {
        fire.getCollection('Users').where('email', '==', String(currentUser.email)).get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                let data = doc.data()
                if(data.Vip){
                    setUserVIP(true)
                }
            })
        }).catch(function(error){
            console.log(error)
        })
    }

    useEffect(() =>{
        getOrders()
        getComplaintsAgainst()
        isThisUserVIP()
    },[])

    const findOrderForCompliment = () => {
        var orderToGet = document.getElementById("OrderSearhCompliment").value
        var orderFound = false
        orders.forEach(order => {
            if(String(order.orderID) === String(orderToGet) && String(order.user) === String(currentUser.email)){
                orderFound = true
            }})
        if(orderFound){
            setShowComplimentForm('block')
        }else{
            toast('invalid order')
        }
    }
    
    const findOrderForComplaint = async() => {
        var orderToGet = document.getElementById("orderSearchComplaint").value
        var orderFound = false
        const tempItems = []
        orders.forEach(order => {
            if(String(order.orderID) === String(orderToGet) && String(order.user) === String(currentUser.email)){
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

    function submitComplaint(){
        console.log(document.getElementById("complaintAbout").value)
        if(document.getElementById("complaintAbout").value === "driver"){
            orders.forEach(function(order){
                console.log(order)
                console.log(order.orderID)
                if(order.orderID == document.getElementById("orderSearchComplaint").value){
                    console.log(order.deliverer)
                    setComplainee(order.deliverer)
                }
            })
        }else if(document.getElementById("complaintAbout") === "driver"){

        }else{

        }
        fire.getCollection('Compls').doc(document.getElementById("complaintTitle").value).set({
            Complainee: complainee,
            Complainer: currentUser.email,
            Description: document.getElementById("complaintDescription").value,
            Disputed: false,
            OrderID: document.getElementById("orderSearchComplaint").value,
            Title: document.getElementById("complaintTitle").value,
            isVIP: userVIP
        }).then(function() {// went through
            console.log("Document successfully written!");
            
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error writing document: ", error);
        });
        toast("complaint submitted")
    }

    const submitCompliment = () => {
        
    }

    const dispute = () => {
        toast("does nothing rn")
    }
    // function getFoodNameByID(idToFind){
    //     var toReturn = ""
    //     if(String(idToFind[0]) === "m"){
    //         fire.getCollection('Food').where('id', '==', String(idToFind)).get().then(querySnapshot => {
    //             querySnapshot.docs.forEach(doc => {
    //                 let data = doc.data()
    //                 toReturn = data.name
    //                 return data.name
    //             })       
    //         }).catch(function(error){
    //             console.log(error)
    //         })
    //     }else{
    //         fire.getCollection('Drink').where('id', '==', String(idToFind)).get().then(querySnapshot => {
    //             querySnapshot.docs.forEach(doc => {
    //                 let data = doc.data()
    //                 toReturn = data.name
    //             })
    //         }).catch(function(error){
    //             console.log(error)
    //         })            
    //     }
    //     return (toReturn)
    // }

    return(
        <div>
        <div className ='background-boi'>
            <div className = "container bigBoxed">
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
                            <input type="text" class="submissionfield" id="complaintDescription"/><br></br>
                            <input type="button" id="submitComplaint" value="Submit" onClick={() => submitComplaint()}></input>
                        </form>
                    </div>
                </div>
                <div class = "row">
                    <div class = "column">
                        <h2>Complaints Against {currentUser.email.substring(0, currentUser.email.indexOf('@'))}</h2>
                        {complaintAgainstUser.map(function(complaint, i){
                            console.log(complaint)
                            return <div key={i} class = "smallBoxed">
                                <h3>Title: {complaint.Title}</h3>
                                <h3>Description: </h3>
                                <p>{complaint.Description}</p><br></br>
                                <button onClick = {dispute(complaint.id)}>dispute</button>
                            </div>
                        })}
                    </div>
                    <div class = "column">
                        <h2>Orders For {currentUser.email.substring(0, currentUser.email.indexOf('@'))}</h2>
                        {orders.map(function(item, i){
                            return <div key={i} class = "smallBoxed">
                            <h3>Order number: {item.orderID}</h3>
                            <h4>Address: {item.address}</h4>
                            <h4>Total: ${item.total}</h4>
                            <div>
                                {item.items.map(function(cart, j){                                
                                    return <div>
                                        <h2>{cart.id} : {cart.quantity}</h2>
                                    </div>
                                })}
                            </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    )
}