import React, { Component,useEffect, useState } from 'react';
import './Manager.css'
import Footer from '../Footer/Footer.js';
import Fire from '../../firebaseConfig';
import {Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css';


export default function ManagerPage() {
    let tests = Fire.db
    const[newUsers, setNewUsers] = useState([])

    useEffect(() =>{
        const users = []
        tests.getCollection('SignUp').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                let currentId = doc.id
                let data = { ...doc.data(), ['id'] : currentId}
                users.push(data)
            });
            setNewUsers(users)
        }).catch(function(error){
            console.log(error)
        })
        
    }, [])

    return (     
        <div style={{textAlign:'center'}}>
            <h1>New users</h1>
            {newUsers.map(function(item, i){
                console.log(item);
                return <div key={i}>
                <h1>User number: {i + 1}</h1>
                <h2>Name: {item.name}</h2>
                <h2>Email: {item.email}</h2>
                <h2>Username: {item.username}</h2>
                <button>Approve</button>
                <br/>
                <br/>
                </div>
            })}
        </div>
   

        );

    
}


/*
 <div className='background-boi'>
                    <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
                        <TabList>
                            <Tab>New Users</Tab>
                            <Tab>Staff</Tab>
                            <Tab>Complaints</Tab>    
                        </TabList>

                        <TabPanel>
                        </TabPanel>
                        
                        <TabPanel>
                           
                            
                        </TabPanel>

                        <TabPanel>
                            <h1>Orders</h1>
                            
                        </TabPanel>
                    </Tabs>
                </div>
                <Footer />

*/