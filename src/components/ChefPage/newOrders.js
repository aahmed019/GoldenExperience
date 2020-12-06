import React, {useEffect, useState } from 'react';
import './ChefPage.css'
import Fire from '../../firebaseConfig';


export default function NewOrders() {
    let tests = Fire.db

    const[newOrders, setNewOrders] = useState([])
    
    const getData = async() =>{
        const orders = []
        tests.getCollection('Orders').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                let currentID = doc.id
                let data = { ...doc.data(), ['OrderID']: currentID}
                orders.push(data)
            });
            setNewOrders(orders)
        }).catch(function(error){
            console.log(error)
        })
    }

    useEffect(() =>{
        getData()
    },[])
    
    async function deleteOrder(id){
        await tests.getCollection('Orders').doc(id).delete()
        .then(() =>{
            console.log("Order completed deleted from Database")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }

    
    return (     
        <div style={{textAlign:'center'}}>
            <h1>Orders</h1>
            <div style={{display:'flex', flexDirection:'row'}}>
            {newOrders.map(function(item, i){
                console.log(item);
                return <div key={i}>
                <h1>Order number: {i + 1}</h1>
                <h2>Name: {item.user}</h2>
                <h2>Address: {item.address}</h2>
                <h2>Total: ${item.total}</h2>
                <h2>Type: {item.type}</h2>
                <button onClick={() => {deleteOrder(item.OrderID)}}>Delete</button>
                <br/>
                <br/>
                </div>
            })}
            </div>
        </div>
   

        );

    
}