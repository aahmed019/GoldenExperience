import React, { Component } from 'react';
import {Card } from 'react-bootstrap';
import './Post.css'
import {Link} from 'react-router-dom';
//import Footer from '../Footer/Footer';

export default function Post(props){
        return(
        // <div style="border: 1px solid black">
            <div className="center background-black">
                <Card className="post-card">
                    <Card.Body>
                    <div><p><Link to ={{pathname: "/Comments", state: {
    comments: props.comments,
    text:props.text,
    username:props.username,
    id: props.id,
    data: props.data   } } } className="gold-text">{props.text} by {props.username}</Link></p></div>
                    </Card.Body>
                </Card>
            </div>

        // </div>)
        )
    
}

