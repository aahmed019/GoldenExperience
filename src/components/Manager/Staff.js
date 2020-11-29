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

    function Promote(staffer){
        tests.getCollection('Staff').doc(staffer).update({
            Salary: promote

        }).then(getData())
    }

    function Demote(staffer, demotionCount){
        if(demotionCount === 2){
            //commented out but works
            //fire(staffer)
        }
        else{
        tests.getCollection('Staff').doc(staffer).update({
            Salary: demote,
            DemotionCounter: increment
        }).then(getData())
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
                return <div key={i} >
                <h5>Name: {item.Name}</h5>
                <h5>Email: {item.Position}</h5>
                <h5>Salary: {item.Salary}</h5>
                <h5>Rating: {item.Rating}</h5>
                <h5>Complaints: {item.ComplaintsCounter}</h5>
                <h5>Compliments: {item.ComplimentsCounter} </h5>
                <h5>Demoted Counter: {item.DemotionCounter} </h5>
                <hr></hr>
                <button onClick={() => Promote(item.Name)}>Promote</button>
                <input type='number' onChange={e => setPromote(e.target.value)}></input>
                <button onClick={() => Demote(item.Name, item.DemotionCounter)}>Demote: </button>
                <input type='number' onChange={e => setDemote(e.target.value)}></input>
                <br/>
                <button onClick={() => fire(item.Name)}>Fire</button>
                <br/>
                </div>
            })}
            </div>
        </div>
   );

    
}
