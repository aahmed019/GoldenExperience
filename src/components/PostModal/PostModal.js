import React, {useEffect, useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import Fire from '../../firebaseConfig';
import "./PostModal.css"
export default function PostModal(props){
    const [val, setValue] = useState('');
    let database = Fire.db
  
    const addWarning = (username, email) =>{
        database.getCollection('Users').doc(email).get().then(function(doc){
            let new_warnings = 0;
            if(doc.exists){
                new_warnings = doc.data().warnings + 1;
              database.getCollection('Users').doc(email).update({
                warnings: new_warnings,
              })
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
                    console.log("violation");
                }
            }).catch(function(error){
                console.log(error)
            })              
                          
        }
        props.handleClose();
    }
    
    
        return(
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
        </Modal>);
    }
