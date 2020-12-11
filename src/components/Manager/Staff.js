import React, {useEffect, useState } from 'react';
import './Manager.css'
import Fire from '../../firebaseConfig';
import 'react-tabs/style/react-tabs.css';
import firebase from 'firebase'

export default function Staff() {
    let tests = Fire.db

    const[staff, setStaff] = useState([])
    const[promote, setPromote] = useState(0);
    const[demote, setDemote] = useState(0);
    const increment = firebase.firestore.FieldValue.increment(1);
   

    const getData = async() =>{
        const staffers = []
        tests.getCollection('Staff').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                //let currentId = doc.id
                let data = doc.data()
                staffers.push(data)
            });
            setStaff(staffers)
        }).catch(function(error){
            console.log(error)
        })
    }

    //basically ComponentDidMount
    useEffect(() =>{
        getData()

    },[])

    async function Promote(staffer){
        tests.getCollection('Staff').doc(staffer).update({
            Salary: promote,
            ComplCounter: 0
        }).then(() =>{
            console.log("User information removed from Database")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }

    async function Demote(staffer, demotionCount){
        if(demotionCount === 2){
            fire(staffer)
        }
        else{
        tests.getCollection('Staff').doc(staffer).update({
            Salary: demote,
            DemotionCounter: increment,
            ComplCounter: 0
        }).then(() =>{
            console.log("User information removed from Database")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }
}

    async function fire(staffer){
        await tests.getCollection('Staff').doc(staffer).delete()
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
            <h1>Staff</h1>
            <div style={{textAlign:'center', display:'flex', flexDirection:'row'}}>
            {staff.map(function(item, i){
                console.log(item);
                return <div key={i} className='color-text' >
                <h5>Name: {item.Name}</h5>
                <h5>Email: {item.Position}</h5>
                <h5>Salary: {item.Salary}</h5>
                <h5>Complaints/Compliments: {item.ComplCounter}</h5>
                <h5>Demoted Counter: {item.DemotionCounter} </h5>
                <hr></hr>
                <button className="btn btn-outline-dark w-20  font-text" onClick={() => Promote(item.email)}>Promote</button>
                <input type='number' onChange={e => setPromote(e.target.value)}></input>
                <button className="btn btn-outline-dark w-20  font-text" onClick={() => Demote(item.email, item.DemotionCounter)}>Demote: </button>
                <input type='number' onChange={e => setDemote(e.target.value)}></input>
                <br/>
                <button className="btn btn-outline-dark w-20 font-text" onClick={() => fire(item.email)}>Fire</button>
                <br/>
                </div>
            })}
            </div>
        </div>
   );

    
}
