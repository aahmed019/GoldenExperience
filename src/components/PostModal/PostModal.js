import React, { Component } from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import Fire from '../../firebaseConfig';

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
            const prevData = this.props.data.posts;
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
                                <input type="text" onChange={this.handleChange} value={this.state.value}/>
                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
        </Modal>);
    }
}
export default PostModal;