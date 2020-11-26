import React, { Component } from 'react';
import {Row} from "react-bootstrap";
import {Link} from 'react-router-dom';
import './Topic.css';


class Topic extends Component{
    render(){
        return(
        <div>
            <p><Link to ={{pathname: "/Posts", state: {
    data: this.props.data,
    id : this.props.id
  } } }>{this.props.name}</Link></p>
        </div>
           
        )
    }
}
export default Topic;