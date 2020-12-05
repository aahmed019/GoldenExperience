import React, {useEffect, useState } from 'react';
import './Manager.css'
import Fire from '../../firebaseConfig';
import 'react-tabs/style/react-tabs.css';
import firebase from 'firebase'

export default function ComplaintCompliment() {
    let tests = Fire.db

    const[Complaints, getComplaints] = useState([])
    const increment = firebase.firestore.FieldValue.increment(1);
    
    const getData = async() =>{
        const comp = []
        tests.getCollection('Compls').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                //let currentId = doc.id
                let data = doc.data()
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
        await tests.getCollection('Staff').doc(staffmember).update({
            ComplaintsCounter: increment
        })
        .then(() =>{
            tests.getCollection('Compls').doc(request).delete()
            console.log("Request Done")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }

    async function AddCompliment(request, staffmember){
        await tests.getCollection('Staff').doc(staffmember).update({
            ComplimentsCounter: increment
        })
        .then(() =>{
            tests.getCollection('Compls').doc(request).delete()
            console.log("Request Done")
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
                <h2>From: {item.sender}</h2>
                <h2>To: {item.staff}</h2>
                <h2>Complaint: {item.complaint}</h2>
                <h2>Compliment: {item.compliment}</h2>
                <button onClick={() => {AddComplaint(item.id, item.staff)}}>Complaint</button>
                <br/><br/>
                <button onClick={() => {AddCompliment(item.id, item.staff)}}>Compliment</button>
                <br/>
                <br/>
                </div>
            })}
            </div>
            
        </div>
   

        );

    
}