import React, { Component } from 'react';
import {Row} from "react-bootstrap";
import {Link} from 'react-router-dom';



class Topic extends Component{
    render(){
        var topics = ["Menu", "Delivery", "Random/Misc"];
        return(
        <Row>
            <p><Link to ={{pathname: "/Posts", state: {
    data: this.props.data
  } } }>{this.props.name}</Link></p>
        </Row>
           
        )
    }
}
export default Topic;