import React, {Component, useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import { useAuth } from '../../../contexts/AuthContext';
import Fire from '../../../firebaseConfig';

export default function SuccessPage (props){
            const {currentUser}= useAuth();
            const {checkoutvalues} = props;
            const {cart, balance,address, city, state, postalCode, total} = checkoutvalues;
            const db = Fire.db;
            const next= e=>{
                e.preventDefault();
                props.startOver();
            }

            useEffect(()=>{
            
                props.UpdateBalance();
                    // prob in updating order history
                    let timestamp = new Date().toLocaleDateString 
                    let time = new Date().toLocaleTimeString
                    let OH =[]
                    OH.push({cart, timestamp, time})
                    timestamp = timestamp + time;
                    db.getCollection('Users').doc(currentUser.email).update({
                        Balance: balance,
                        orderHistory: OH 

            
                    })/*.then(()=>{
                        db.getCollection('Orders').update({

                        })
                    })*/.catch(error => console.log(error))
                
            
            },[])
          
                return(
                    <div className="CheckOut">
                    <h1>Success Page</h1>
                    <div>
                    <Button variant="primary"  name="step" value={0} onClick={next}>Order Again</Button>
                    </div>
                </div>
                )
            }
            
        
        
