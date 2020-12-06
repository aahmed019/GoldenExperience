import React, { Component } from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import Fire from '../../firebaseConfig';
import "./PostModal.css"
class PostModal extends Component{
    constructor(props) { 
        super(props);
        this.state = {
            value : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.db = Fire.db
    }

    handleChange(e){
        this.setState({value: e.target.value});
    }
    handleSubmit(){

        if(this.state.value.length > 0){
            let prevData = [];
            let tabooList = [];
          
            this.db.getCollection('TabooWords').get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    //let currentId = doc.id
                    tabooList.push(doc.id);
                });
                let violation_count = 0;
                for(let i = 0; i < tabooList.length; i++){
                    console.log(tabooList[i]);
    
                    let ast_str = "";
                    for(let j = 0; j < tabooList[i].length; j++){
                        ast_str += "*";
                    }
                    // temp = tabooList[i];
                    let count = this.state.value.split(tabooList[i]).length - 1;;
                    violation_count += count;
                    this.state.value = this.state.value.replaceAll(tabooList[i], ast_str);
                    // console.log(violation_count, this.state.value);
                }
                if(violation_count <= 3){
                    console.log("no violation");
                    if(this.props.data.posts){
                        prevData = this.props.data.posts;
                    }
                    const newData = {
                        "text": this.state.value,
                        "username": "eram",
                        time: this.db.getTime(),
                        comments : [] 
        
                    }
                    prevData.push(newData);
                    console.log(prevData);
                    this.db.getCollection("Topics").doc(this.props.id).update({
                        "posts": prevData
                    }).then(() =>{
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

        
            // useEffect(() =>{
            //     getData()
            // },[])
            console.log(tabooList[0])
            
              
                          
        }
        this.props.handleClose();
    }

    render(){
        return(
        <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header>
                    <Modal.Title>Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.handleSubmit}>
                                <div>
                                    <h6>Post:</h6>
                                <input type="text" className="post-modal-input" onChange={this.handleChange} value={this.state.value}/>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary post-modal-button" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary post-modal-button" onClick={this.handleSubmit}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
        </Modal>);
    }
}
export default PostModal;