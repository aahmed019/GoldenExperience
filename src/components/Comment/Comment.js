import React, { Component } from 'react';
import Fire from '../../firebaseConfig';
import './Comment.css'

class Comment extends Component{
    constructor(props) { 
        super(props);
        this.state = {
            value : ""
        }
        this.db = Fire.db
    }
    render(){
        return(
            <div className="comment">
                <p>{this.props.text} by {this.props.username}</p>
            </div>
        );
    }
}
export default Comment; 