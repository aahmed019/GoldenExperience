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
    const[showDiscussionComplaintForm, setShowDiscussionComplaintForm] = useState('none')
    const[items, setItems] = useState([])
    const[complaintAgainstUser, setComplaintAgainstUser] = useState([])
    const[orders, setOrders] = useState([])
    const[userVIP, setUserVIP] = useState(false)
    const{currentUser} = useAuth()
    const query = queryString.parse(props.location.search);
    const usertype = query.user;
    let fire = Fire.db 
    console.log(usertype)
    console.log(currentUser.name)

    const getOrders = async() => {
        console.log(currentUser.email)
        const tempOrders = []
        if(usertype === "driver"){
            fire.getCollection('Orders').where('deliverer', '==', String(currentUser.email)).get().then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    let currentID = doc.id
                    let data = { ...doc.data(), ['orderID']: currentID}
                    console.log(data)
                    tempOrders.push(data)
                })
                setOrders(tempOrders)
            }).catch(function(error){
                console.log(error)
            })
        }else if(usertype === "chef"){
            //getFood()
        }else{
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

    function findOrderForCompliment() {
        var orderToGet = document.getElementById("orderSearchCompliment").value
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
    
    function findOrderForComplaint() {
        var orderToGet = document.getElementById("orderSearchComplaint").value
        var orderFound = false
        orders.forEach(order => {
            const tempItems = items
            if(String(order.orderID) === String(orderToGet) && String(order.user) === String(currentUser.email)){
                orderFound = true
                order.items.forEach(item => {
                    if(String(item.id[0]) === "m"){
                        fire.getCollection('Food').where('id', '==', String(item.id)).get().then(querySnapshot => {
                            querySnapshot.docs.forEach(doc => {
                                let data = doc.data()
                                tempItems.push([item.id, data.name])
                            })
                            setItems(tempItems)
                        }).catch(function(error){
                            console.log(error)
                        })
                    }else{
                        fire.getCollection('Drink').where('id', '==', String(item.id)).get().then(querySnapshot => {
                            querySnapshot.docs.forEach(doc => {
                                let data = doc.data()
                                tempItems.push([item.id, data.name])
                            })
                            setItems(tempItems)
                        }).catch(function(error){
                            console.log(error)
                        })
                    }
                })
            }
        })        
        if(orderFound){
            setShowComplaintForm('block')
        }else{
            toast('invalid order')
        }
        getOrders()
    }

    function submitComplaint(){
        console.log(document.getElementById("complaintAbout").value)
        var complainee = ""
        if(document.getElementById("complaintAbout").value === "driver"){
            orders.forEach(order =>{
                console.log(order)
                console.log(order.orderID)
                if(order.orderID == document.getElementById("orderSearchComplaint").value){
                    console.log(order.deliverer)
                    complainee = order.deliverer
                }
            })
        }else if(document.getElementById("complaintAbout").value === "customer"){
            orders.forEach(order =>{
                console.log(order)
                console.log(order.orderID)
                if(order.orderID == document.getElementById("orderSearchComplaint").value){
                    console.log(order.user)
                    complainee = order.user
                }
            })
        }else{
            var foodOrDrink = document.getElementById("complaintAbout").value
            var temp = ""
            if(String(foodOrDrink) === "m"){
                fire.getCollection('Food').where('id', '==', String(foodOrDrink)).get().then(querySnapshot => {
                    querySnapshot.docs.forEach(doc => {
                        let data = doc.data()
                        temp = data.Chef
                    })
                    complainee = temp
                }).catch(function(error){
                    console.log(error)
                })
            }else{
                fire.getCollection('Drink').where('id', '==', String(foodOrDrink)).get().then(querySnapshot => {
                    querySnapshot.docs.forEach(doc => {
                        let data = doc.data()
                        console.log(data.Chef)
                        temp = data.Chef
                    })
                    complainee = temp
                }).catch(function(error){
                    console.log(error)
                })
            }
        }
        fire.getCollection('Compls').doc().set({
            Complainee: complainee,
            Complainer: currentUser.email,
            Description: document.getElementById("complaintDescription").value,
            Disputed: false,
            OrderID: document.getElementById("orderSearchComplaint").value,
            Title: document.getElementById("complaintTitle").value,
            isVIP: userVIP,
            isCompliment: false
        }).then(function() {// went through
            console.log("Document successfully written!");
            
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error writing document: ", error);
        });
        toast("complaint submitted")
    }

    const submitCompliment = () => {
        var complainee = ""
        console.log(document.getElementById("complimentTo").value)
        if(document.getElementById("complimentTo").value === "driver"){
            orders.forEach(order =>{
                console.log(order)
                console.log(order.orderID)
                if(order.orderID == document.getElementById("orderSearchCompliment").value){
                    console.log(order.deliverer)
                    complainee = order.deliverer
                }
            })
        }else if(document.getElementById("complimentTo") === "customer"){

        }else{

        }
        fire.getCollection('Compls').doc().set({
            Complainee: complainee,
            Complainer: currentUser.email,
            Description: document.getElementById("complimentDescription").value,
            Disputed: false,
            OrderID: document.getElementById("orderSearchCompliment").value,
            Title: document.getElementById("complimentTitle").value,
            isVIP: userVIP,
            isCompliment: true
        }).then(function() {// went through
            console.log("Document successfully written!");
            
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error writing document: ", error);
        });
        toast("compliment submitted")
    }

    function dispute(id) {
        fire.getCollection('Compls').doc(id).update({
            Disputed: true,
            Dispute: document.getElementById("disputeReason").value
        }).then(function() {// went through
            console.log("Document successfully written!");
            
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error writing document: ", error);
        });
        toast("complaint disputed")
        getComplaintsAgainst()
    }

    const makeDiscussionFormVisible = () => {
        setShowDiscussionComplaintForm('block')
    }

    function getComplaineeEmailDiscussion(){
        var complainee = ""
        fire.getCollection("Users").where("username", "==", String(document.getElementById("discussionComplainee").value)).get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                let data = doc.data()
                complainee = data.email
            })
            submitDiscussionComplaint(complainee)
        }).catch(function(error){
            console.log(error)
        })
    }

    function submitDiscussionComplaint(complainee){
        console.log(complainee)
        fire.getCollection('Compls').doc().set({            
            Complainee: complainee,
            Complainer: currentUser.email,
            Description: document.getElementById("discussionComplaintDesciption").value,
            Disputed: false,
            OrderID: "DISCUSSION COMPLAINT",
            Title: document.getElementById("discussionComplaintTitle").value,
            isVIP: userVIP,
            isCompliment: false
        }).then(function() {// went through
            console.log("Document successfully written!");
            
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error writing document: ", error);
        });
        toast("complaint submitted")
    }

    return(
        <div>
        <div className ='background-boi'>
            <div className = "container bigBoxed">
            <button onClick={() => makeDiscussionFormVisible()}>Complaint against user on discussion page</button>
                    <form style = {{display: showDiscussionComplaintForm}}>
                            <h3>Username</h3>
                            <input type="text" id="discussionComplainee"/>
                            <h3>Title</h3>
                            <input type="text" id="discussionComplaintTitle"/>
                            <h3>Description</h3>
                            <input type="text" className="submissionfield" id="discussionComplaintDesciption"/><br></br>
                            <input type="button" id="submitDiscussionComplaint" value="Submit" onClick={() => getComplaineeEmailDiscussion()}></input>
                        </form>
                <div className="row" style = {{backgroundColor: "green"}}>                    
                    <div className="column" style = {{backgroundColor: "blue"}} >
                        <h2>Submit Compliment</h2>
                        <h3>Order Number</h3>
                            <input type="text" id="orderSearchCompliment"/>
                            <input type="button" id="OrderSearhComplimentExecute" value="Search" onClick = {() => findOrderForCompliment()}/><br></br>
                        <form style = {{display: showComplimentForm}}>
                            <h3>Who/What would you like to compliment?</h3>
                            <select name="complimentTo" id="complimentTo">
                                {items.map(function(item, i){
                                    return <option key = {i} id={item[0]} value={item[1]}>{item[1]}</option>
                                })}
                                <option value="customer">Customer</option>
                                <option value="driver">Driver</option>
                            </select>
                            <h3>Title</h3>
                            <input type="text" id="complimentTitle"/>
                            <h3>Description</h3>
                            <input type="text" className="submissionfield" id="complimentDescription"/><br></br>
                            <input type="button" id="submitCompliment" value="Submit" onClick={() => submitCompliment()}></input>
                        </form>
                    </div>
                    <div className="column" style = {{backgroundColor: "purple"}} >
                        <h2>Submit Complaint</h2>
                        <h3>Order Number</h3>
                        <input type="text" id="orderSearchComplaint"/>
                        <input type="button" id="orderSearchComplaintExecute" value="Search" onClick = {() => findOrderForComplaint()}/><br></br>
                        <div style = {{display: showComplaintForm}}>
                            <h3>Who/What would you like to complain about?</h3>
                            <select id="complaintAbout">
                                {items.map(function(item, i){
                                    console.log(item[1])
                                    return <option key = {i} id={item[0]} value={item[1]}>{item[1]}</option>
                                })}
                                <option value="driver">Driver</option>
                                <option value="customer">Customer</option>                                
                            </select>
                            <h3>Title</h3>
                            <input type="text" id="complaintTitle"/>
                            <h3>Description</h3>
                            <input type="text" className="submissionfield" id="complaintDescription"/><br></br>
                            <input type="button" id="submitComplaint" value="Submit" onClick={() => submitComplaint()}></input>
                        </div>
                    </div>
                </div>
                <div className = "row">
                    <div className = "column">
                        <h2>Complaints Against {currentUser.email.substring(0, currentUser.email.indexOf('@'))}</h2>
                        {complaintAgainstUser.map(function(complaint, i){
                            if(!complaint.isCompliment && !complaint.Disputed){
                                return <div key={i} className = "smallBoxed">
                                <h3>Title: {complaint.Title}</h3>
                                <h3>Description: </h3>
                                <p>{complaint.Description}</p><br></br>
                                <h3>Reason for Dispute:</h3>
                                <input type="text" className="submissionfield" id="disputeReason"/><br></br>
                                <button id = {complaint.id} onClick = {() => dispute(complaint.id)}>dispute</button>
                            </div>
                            }
                        })}
                    </div>
                    <div className = "column">
                        <h2>Orders {currentUser.email.substring(0, currentUser.email.indexOf('@'))} is involved in</h2>
                        {orders.map(function(item, i){
                            return <div key={i} className = "smallBoxed">
                            <h3>Order number: {item.orderID}</h3>
                            <h4>Address: {item.address}</h4>
                            <h4>Total: ${item.total}</h4>
                            <div>
                                {item.items.map(function(cart, j){
                                    return <div key = {j}>
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