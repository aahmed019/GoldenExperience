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

    async function NoMerit(requestID, email){
        await tests.getCollection('Users').doc(email).get().then(function(doc){
            let new_warnings = 0;
            let vip_status = false;
            if(doc.exists){
              new_warnings = doc.data().warnings + 1;
              vip_status = doc.data().Vip;
              tests.getCollection('Users').doc(email).update({
                warnings: new_warnings,
              })
              if(new_warnings >= 2 && (vip_status == "true" || vip_status == true) ){
                tests.getCollection('Users').doc(email).update({
                    Vip: false,
                    warnings: 0
                  })
              }
              else if(new_warnings >= 3 && (vip_status == "false" || vip_status == false) ){
                  console.log("here in if")
                  deleteUser(email);
              }
            }
        })
        deleteReport(requestID);
    }

    async function deleteUser(user){
        await tests.getCollection('Users').doc(user).delete()
        .then(() =>{
            console.log("User deleted from Database")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }
    
    async function deleteReport(requestID){
        tests.getCollection('Compls').doc(requestID).delete()
        getData();
    }


    return (     
        <div style={{textAlign:'center'}}>
            <h1>Complaints and Compliments</h1>
            <div style={{display:'flex', flexDirection:'row',
            height:'900px',
            width:'100%',
            overflow:'auto'
        }}>
            {Complaints.map(function(item, i){
                console.log(item);
                return <div key={i}>
                <h1>Complaint number: {i + 1}</h1>
                <h2>From: {item.Complainer} {item.isVIP ? '[VIP]' :''}</h2>
                <h2>To: {item.Complainee}</h2>
                <h2>Title {item.Title}</h2>
                <h2>Description: {item.Description}</h2>
                <h2>Disputee: {item.Dispute}</h2>
                <button onClick={() => {AddComplaint(item.id, item.Complainee, item.isVIP)}}>Complaint</button>
                <br/><br/>
                <button onClick={() => {AddCompliment(item.id, item.staff, item.isVIP)}}>Compliment</button>
                <button onClick={() => {NoMerit(item.id ,item.Complainer)}}>No Merit</button>
                <button onClick={() => {deleteReport(item.id)}}>Delete</button>
                <br/>
                <br/>
                </div>
            })}
            </div>
            
        </div>
   

        );

    
}