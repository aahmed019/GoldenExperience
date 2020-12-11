import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Topic.css';


class Topic extends Component{
    render(){
        return(
        <div>
            <p><Link style={{fontSize: "2rem", marginLeft: "2%"}} className = "topic-link"to ={{pathname: "/Posts", state: {
    data: this.props.data,
    id : this.props.id
  } } }>{this.props.name}</Link></p>
        </div>
           
        )
    }
}
export default Topic;