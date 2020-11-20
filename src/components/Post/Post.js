import React, { Component } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import './Post.css'

class Post extends Component{
    render(){
        return(
        // <div style="border: 1px solid black">
            <div className="center">
                <Card>
                    <Card.Body>
                    <div><p>{this.props.text} by {this.props.username}</p></div>
                    </Card.Body>
                </Card>
            </div>

        // </div>)
        )
    }
}

export default Post;
