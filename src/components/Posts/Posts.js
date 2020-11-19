import React, { Component } from 'react';
import {Row} from "react-bootstrap";
import Post from "../Post/Post"

class Posts extends Component{
    constructor(props) { 
        super(props);
   
        this.state = {
            data : this.props.location.state
        }
    }
    render(){
        const {data} = this.props.location.state;
        console.log(data)
        return(
            <Row>
            <Row><p>{data.name}</p></Row>
            <Row>{data.posts && data.posts.map(post => {
                const date = post.time.toDate().toString();
                return(
                    <Post username={post.username} text={post.text} time={date}></Post> 
                )})}
            </Row>
            </Row>
        );
    }

}
export default Posts;