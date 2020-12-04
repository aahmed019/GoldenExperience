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

    function Approve(username, email, password, name){
        tests.getCollection('Users').doc(email).set({
            username: username,
            password: password,
            name: name,
            email: email,
            orderHistory: [],
            warnings: 0,
            Balance: 0,
            Vip: "false"
            })
            .then(function() {// went through
                console.log("Approved!");
                
            })
            .catch(function(error) { //broke down somewhere
                console.error("Error: ", error);
            });

            deleteNewSignUp(username)
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
            <div style={{display:'flex', flexDirection:'row'}}>
            {newUsers.map(function(item, i){
                console.log(item);
                return <div key={i}>
                <h1>Application number: {i + 1}</h1>
                <h2>Name: {item.name}</h2>
                <h2>Email: {item.email}</h2>
                <h2>Username: {item.username}</h2>
                <button onClick={() => {Approve(item.username, item.email, item.password, item.name)}}>Approve</button>
                <br/><br/>
                <button onClick={() => {deleteNewSignUp(item.username)}}>Deny</button>
                <br/>
                <br/>
                </div>
            })}
            </div>
        </div>
   

        );

    
}
