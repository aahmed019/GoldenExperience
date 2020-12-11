import React, {useEffect, useState } from 'react';
import './Manager.css'
import Fire from '../../firebaseConfig';

export default function Hire() {
    let tests = Fire.db

    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[position, setPosition] = useState('')
    const[salary, setSalary] = useState(0)

    function hireEmployee(name, EmpEmail, Password, position, salary){
        tests.getCollection('Staff').doc(EmpEmail.toLowerCase()).set({
            Name: name.charAt(0).toUpperCase() + name.slice(1),
            Position: position.charAt(0).toUpperCase() + position.slice(1),
            Salary: salary,
            email: EmpEmail.toLowerCase(),
            password: Password,
            ComplCounter: 0,
            DemotionCounter: 0
            })
            .then(function() {// went through
                console.log("Hired!");
                
            })
            .catch(function(error) { //broke down somewhere
                console.error("Error: ", error);
            });
    }



    return (     
        <div style={{textAlign:'center'}}>
            <h1>Hire new employee</h1>
            <input type='text' onChange={e => setName(e.target.value)} placeholder="Enter Name"></input>
            <input type='text' onChange={e => setEmail(e.target.value)} placeholder="Enter Email"></input>
            <input type='text' onChange={e => setPassword(e.target.value)} placeholder="Enter Account Password"></input>
            <input type='text' onChange={e => setPosition(e.target.value)} placeholder="Enter Position"></input>
            <input type='number' onChange={e => setSalary(e.target.value)} placeholder="Enter Salary"></input>

            <button onClick={() => hireEmployee(name, email, password, position, salary)}>Submit</button>
            
            <div>
            
            </div>
        </div>
   

        );

    
}