import React, {useEffect, useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import Fire from '../../firebaseConfig';
import "./PostModal.css"
import Notifications, {notify} from 'react-notify-toast';

export default function PostModal(props){
    const [val, setValue] = useState('');
    let database = Fire.db
    
    const deRegisterUser = (email) => {
        database.getCollection('Users').doc(email).delete()
        .then(() =>{
            notify.show('Stop cursing! You have been deregistered!');
            window.location.reload(false);
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });
    }

    const removeVIP = (email) => {
        database.getCollection('SignUp').doc(email).update({
            Vip: "false",
            warnings: 0
          })
        database.getCollection('Users').doc(email).update({
            Vip: "false",
            warnings: 0
        }).then(() => {
            notify.show('Stop cursing! Your VIP status has been removed!');
        })
    }

    const addWarning = (username, email) =>{
        console.log("need to enter", username, email)
        database.getCollection('Users').doc(email).get().then(function(doc){
            let new_warnings = 0;
            let vip_status = false;
            if(doc.exists){
              new_warnings = doc.data().warnings + 1;
              vip_status = doc.data().Vip;
              database.getCollection('Users').doc(email).update({
                warnings: new_warnings,
              })
              if(new_warnings >= 2 && (vip_status == "true" || vip_status == true) ){
                removeVIP(email);
              }
              else if(new_warnings >= 3 && (vip_status == "false" || vip_status == false) ){
                  console.log("here in if")
                deRegisterUser(email);
              }else{
                notify.show('Stop cursing! A warning has been added to your account!');
              }
           
            }
        })
    }

    const handleSubmit = (e) =>{
        // e.preventDefault();
        if(val.length > 0){
            let prevData = [];
            let tabooList = [];
          
            database.getCollection('TabooWords').get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    //let currentId = doc.id
                    tabooList.push(doc.id);
                });
                let violation_count = 0;
                let new_val = val;
                for(let i = 0; i < tabooList.length; i++){
    
                    let ast_str = "";
                    for(let j = 0; j < tabooList[i].length; j++){
                        ast_str += "*";
                    }
                    // temp = tabooList[i];
                    let count = val.split(tabooList[i]).length - 1;
                    violation_count += count;
                    new_val = new_val.replaceAll(tabooList[i], ast_str)
                    setValue(new_val)
                }
                if(violation_count <= 3){
                    if(violation_count > 0){
                        addWarning(props.username, props.email);
                    }
                    if(props.data.posts){
                        prevData = props.data.posts;
                    }
                    const newData = {
                        "text": new_val,
                        "username": props.username,
                        time: database.getTime(),
                        comments : [] 
        
                    }
                    prevData.push(newData);
                    console.log(prevData);
                    console.log(props.username)
                    database.getCollection("Topics").doc(props.id).update({
                        "posts": prevData
                    }).then(() =>{
                        props.getPosts()
                        setValue("")
                    console.log("New Post Added to Database")
                    }).catch(function(error) { //broke down somewhere
                    console.error("Error: ", error);
                    });
                }
                else{
                    addWarning(props.username, props.email);
                    notify.show('Stop cursing! The message has been blocked and a warning has been added to your account!');
                    setValue("")
                }
            }).catch(function(error){
                console.log(error)
            })              
                          
        }
        props.handleClose();
    }
    
    
        return(
            <div>
        <Modal show={props.show} onHide={props.handleClose}>
                    <Modal.Header>
                    <Modal.Title>Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={props.handleSubmit}>
                                <div>
                                    <h6>Post:</h6>
                                <input type="text" className="post-modal-input" onChange={e => setValue(e.target.value)} value={val}/>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary post-modal-button" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary post-modal-button" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
        </Modal>
        <Notifications />
        </div>
);
    }
