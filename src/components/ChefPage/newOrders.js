import React, {useEffect, useState } from 'react';
import './Chef.css'
import Fire from '../../firebaseConfig';

export default function newOrders() {
    let tests = Fire.db

    const[newUsers, setNewUsers] = useState([])
    
    
    return (     
        <div style={{textAlign:'center'}}>
            <h1>Users</h1>
            <div style={{display:'flex', flexDirection:'row'}}>
            {newUsers.map(function(item, i){
                console.log(item);
                return <div key={i}>
                <h1>User number: {i + 1}</h1>
                <h2>Name: {item.name}</h2>
                <h2>Email: {item.email}</h2>
                <h2>Username: {item.username}</h2>
            <h2>Balance: {item.Balance}</h2>
            <h2>Warnings: {item.warnings}</h2>
                <button onClick={() => {deleteUser(item.username)}}>Delete</button>
                <br/>
                <br/>
                </div>
            })}
            </div>
        </div>
   

        );

    
}