import React, {useEffect, useState } from 'react';
import './Manager.css'
import Fire from '../../firebaseConfig';
import 'react-tabs/style/react-tabs.css';
import firebase from 'firebase'

export default function ComplaintCompliment() {
    let tests = Fire.db

    const[Complaints, getComplaints] = useState([])
    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    
    const getData = async() =>{
        const comp = []
        tests.getCollection('Compls').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                let currentID = doc.id
                let data = {...doc.data(), ['id']: currentID}
                comp.push(data)
            });
            getComplaints(comp)
        }).catch(function(error){
            console.log(error)
        })
    }

    useEffect(() =>{
        getData()
    },[])


    async function AddComplaint(request, staffmember){
        await tests.getCollection('Staff').where('staff', '===', staffmember).update({
            ComplCounter: decrement
        })
        .then(() =>{
            tests.getCollection('Compls').doc(request).delete()
            console.log("Complaint Added")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }

    async function AddCompliment(request, staffmember){
        var t = tests.getCollection('Staff').where('staff', '==', staffmember).get();
        t.update({
            ComplCounter: increment
        })
        .then(() =>{
            tests.getCollection('Compls').doc(request).delete()
            console.log("Compliment Added")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }

    async function NoMerit(requestID ,user){
        await tests.getCollection('Users').doc(user).update({
            warnings: increment
        })
        .then(() =>{
            tests.getCollection('Compls').doc(requestID).delete()
            console.log("No Merit Done")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }


    return (     
        <div style={{textAlign:'center'}}>
            <h1>Complaints and Compliments</h1>
            <div style={{display:'flex', flexDirection:'row' }}>
            {Complaints.map(function(item, i){
                console.log(item);
                return <div key={i}>
                <h1>Complaint number: {i + 1}</h1>
                <h2>From: {item.user}</h2>
                <h2>To: {item.staff}</h2>
                <h2>Description: {item.complaint}</h2>
                <button onClick={() => {AddComplaint(item.id, item.staff)}}>Complaint</button>
                <br/><br/>
                <button onClick={() => {AddCompliment(item.id, item.staff)}}>Compliment</button>
                <button onClick={() => {NoMerit(item.id ,item.complainee)}}>No Merit</button>
                <br/>
                <br/>
                </div>
            })}
            </div>
            
        </div>
   

        );

    
}