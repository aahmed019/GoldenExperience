import React, { Component } from 'react';
import {Card } from 'react-bootstrap';
import './Post.css'
import {Link} from 'react-router-dom';
//import Footer from '../Footer/Footer';

class Post extends Component{
    render(){
        return(
        // <div style="border: 1px solid black">
            <div className="center background-black">
                <Card className="post-card">
                    <Card.Body>
                    <div><p><Link to ={{pathname: "/Comments", state: {
    comments: this.props.comments,
    text:this.props.text,
    username:this.props.username,
    id: this.props.id,
    data: this.props.data   } } } className="gold-text">{this.props.text} by {this.props.username}</Link></p></div>
                    </Card.Body>
                </Card>
            </div>

        // </div>)
        )
    }
}

export default Post;
