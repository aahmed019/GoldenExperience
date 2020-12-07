import React, {useState} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useAuth } from "../../contexts/AuthContext"
import Fire from '../../firebaseConfig';
import "./Deposit.css"
import {Row} from "react-bootstrap";
import Notifications, {notify} from 'react-notify-toast';

export default function Deposit() {

  const [cvc, setCVC] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [amount, setAmount] = useState('');
  const { currentUser, logout } = useAuth()
  if(currentUser == null){
    return(<div>Please log in to view this page</div>)
  }
  let database = Fire.db;

  const handleSubmit = (e) => {
    e.preventDefault();
      database.getCollection('Users').doc(currentUser.email).get().then(function(doc){
        let newBalance = 0;
        if(doc.exists){
          newBalance = doc.data().Balance + parseInt(amount);
          console.log(newBalance)
  
          database.getCollection('Users').doc(currentUser.email).update({
            Balance: newBalance,
          })
        }
        else{
          database.getCollection('SignUp').doc(currentUser.email).get().then(function(doc){
            if(newBalance == 0){
              newBalance = doc.data().Balance + parseInt(amount);
            }
            database.getCollection('SignUp').doc(currentUser.email).update({
              Balance: newBalance,
            })
          }).then(() => {
            notify.show('Money Deposited!');
          })
        }
         
      })
  }
    return (
      <div>
      <Row id="PaymentForm">
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus}
          name={name}
          number={number}
        />
        <form className = "deposit-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="amount"
                className="form-control"
                placeholder="Amount"
                pattern="\d*"
                required
                onChange={e => setAmount(e.target.value)} 
                value={amount}
                onFocus={e => setFocus(e.target.name)}
              />
              <input
                type="tel"
                name="number"
                className="form-control mt-1"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={e => setNumber(e.target.value)} 
                value={number}
                onFocus={e => setFocus(e.target.name)}
              />
              <input
                type="text"
                name="name"
                className="form-control mt-1"
                placeholder="Name"
                required
                onChange={e => setName(e.target.value)} 
                value={name}
                onFocus={e => setFocus(e.target.name)}
              />
            <Row>
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control mt-1"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={e => setExpiry(e.target.value)} 
                  value={expiry}
                  onFocus={e => setFocus(e.target.name)}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control mt-1"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={e => setCVC(e.target.value)} 
                  value={cvc}
                  onFocus={e => setFocus(e.target.name)}
                />
              </div>
            </Row>
            <div>
              <button type="submit" className="btn btn-primary btn-block mt-3 font-text">DEPOSIT</button>
            </div>
          </form>
      </Row>
      <Notifications />
      </div>
    );
  }

