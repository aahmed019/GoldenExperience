import React, {useEffect, useState } from 'react';
import './Manager.css'
import Fire from '../../firebaseConfig';
import 'react-tabs/style/react-tabs.css';


export default function NewUsers() {
    let tests = Fire.db

    const[newUsers, setNewUsers] = useState([])
    
    const getData = async() =>{
        const users = []
        tests.getCollection('SignUp').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                //let currentId = doc.id
                let data = doc.data()
                users.push(data)
            });
            setNewUsers(users)
        }).catch(function(error){
            console.log(error)
        })
    }

    useEffect(() =>{
        getData()
    },[])

    function Approve(username, email, password, name, balance, warnings){
        tests.getCollection('Users').doc(email).set({
            username: username,
            password: password,
            name: name,
            email: email,
            orderHistory: [],
            warnings: warnings,
            Balance: balance,
            Vip: false
            })
            .then(function() {// went through
                console.log("Approved!");
                
            })
            .catch(function(error) { //broke down somewhere
                console.error("Error: ", error);
            });

            deleteNewSignUp(email)
    }

    async function deleteNewSignUp(user){
        await tests.getCollection('SignUp').doc(user).delete()
        .then(() =>{
            console.log("User information removed from Database")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }

    return (     
        <div style={{textAlign:'center'}}>
            <h1>New users</h1>
            <div style={{display:'flex', flexDirection:'column'}}>
            {newUsers.map(function(item, i){
                console.log(item);
                return <div key={i} className="complaint">
                <h1>Application number: {i + 1}</h1>
                <h2>Name: {item.name}</h2>
                <h2>Email: {item.email}</h2>
                <h2>Username: {item.username}</h2>
                <h2>Balance: {item.Balance}</h2>
                <h2>Warnings: {item.warnings}</h2>
                <button className="btn btn-outline-dark w-20 mt-3 font-text" onClick={() => {Approve(item.username, item.email, item.password, item.name ,item.Balance, item.warnings)}}>Approve</button>
                <br/><br/>
                <button className="btn btn-outline-dark w-20 mt-3 font-text" onClick={() => {deleteNewSignUp(item.email)}}>Deny</button>
                <br/>
                <br/>
                </div>
            })}
            </div>
        </div>
   

        );

    
}
