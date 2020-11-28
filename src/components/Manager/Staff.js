import React, {useEffect, useRef, useState } from 'react';
import './Manager.css'
import Fire from '../../firebaseConfig';
import 'react-tabs/style/react-tabs.css';


export default function Staff() {
    let tests = Fire.db

    const[staff, setStaff] = useState([])
    const mounting = useRef(true)

    useEffect(() =>{
        if(mounting.current){
            mounting.current = false;
        }
        else{
        const staffMembers = []
        tests.getCollection('Staff').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                let data = doc.data()
                staffMembers.push(data)
            });
            setStaff(staffMembers)
        }).catch(function(error){
            console.log(error)
        })
        
    }})

    return (     
        <div style={{textAlign:'center'}}>
            <h1>Staff</h1>
            {staff.map(function(item, i){
                console.log(item);
                return <div key={i}>
                <h1>User number: {i + 1}</h1>
                <h2>Name: {item.name}</h2>
                <h2>Email: {item.email}</h2>
                <h2>Username: {item.username}</h2>
                <button >Approve</button>
                <br/><br/>
                <br/>
                <br/>
                </div>
            })}
        </div>
   );

    
}