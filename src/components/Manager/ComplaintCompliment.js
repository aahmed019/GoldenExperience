import React, {useEffect, useState } from 'react';
import './Manager.css'
import Fire from '../../firebaseConfig';
import 'react-tabs/style/react-tabs.css';
import firebase from 'firebase'

export default function ComplaintCompliment() {
    let tests = Fire.db

    const[Complaints, getComplaints] = useState([])
    
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


    async function AddComplaint(requestID, staffmember, VIP){
    await tests.getCollection('Staff').where('email', '==', staffmember).limit(1).get()
        .then((snapshot) =>{
            const staffInformation = snapshot.docs[0];                                              
            staffInformation.ref.update({ComplCounter: firebase.firestore.FieldValue.increment(VIP? -2 : -1)});
        }).then(() =>{
            tests.getCollection('Compls').doc(requestID).delete()
            console.log("Complaint Added")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }

    async function AddCompliment(requestID, staffmember, VIP){
        await tests.getCollection('Staff').where('Name', '==', staffmember).limit(1).get()
        .then((snapshot) =>{
            const staffInformation = snapshot.docs[0];                                              
            staffInformation.ref.update({ComplCounter: firebase.firestore.FieldValue.increment(VIP? -2 : -1)});
        }).then(() =>{
            tests.getCollection('Compls').doc(requestID).delete()
            console.log("Compliment Added")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }

    async function NoMerit(requestID ,user){
        await tests.getCollection('Staff').where('name', '==', user).limit(1).get()
        .then((snapshot) =>{
            const userInformation = snapshot.docs[0];                                              
            userInformation.ref.update({warning: firebase.firestore.FieldValue.increment(1)});
        }).then(() =>{
            tests.getCollection('Compls').doc(requestID).delete()
            console.log("No Merit Done")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }

    async function deleteReport(requestID){
        tests.getCollection('Compls').doc(requestID).delete()
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
                <h2>From: {item.Complainer} {item.isVIP ? '[VIP]' :''}</h2>
                <h2>To: {item.Complainee}</h2>
                <h2>Description: {item.Description}</h2>
                <button onClick={() => {AddComplaint(item.id, item.Complainee, item.isVIP)}}>Complaint</button>
                <br/><br/>
                <button onClick={() => {AddCompliment(item.id, item.staff, item.isVIP)}}>Compliment</button>
                <button onClick={() => {NoMerit(item.id ,item.complainee)}}>No Merit</button>
                <button onClick={() => {deleteReport(item.id)}}>Delete</button>
                <br/>
                <br/>
                </div>
            })}
            </div>
            
        </div>
   

        );

    
}