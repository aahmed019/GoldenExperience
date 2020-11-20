import React, { Component } from 'react';
import {Button, Modal} from "react-bootstrap";

class PostModal extends Component{
    render(){
        return(
        <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
        </Modal>);
    }
}
export default PostModal;