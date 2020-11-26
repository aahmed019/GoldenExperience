import React, { Component } from 'react';
import {Button, Form} from "react-bootstrap";
import Fire from '../../firebaseConfig';
import Comment from "../Comment/Comment"
import './CommentSection.css'

class CommentSection extends Component{
    constructor(props) { 
        super(props);
        if(this.props.location.state){
            this.state = {
                value : "",
                comments : this.props.location.state.comments,
            }    
        }
        else{
            this.state = {
                value : "",
            }    
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
           let prevData = this.props.location.state.data.posts;
           console.log(prevData);
            for(let i = 0; i < prevData.length; i++){
                if(prevData[i].text == this.props.location.state.text && prevData[i].username == this.props.location.state.username){
                    prevData[i].comments.push({
                        "text": this.state.value,
                        "username": "rudeuser",
                        time: this.db.getTime()
                    })
                }
            }
            console.log(prevData);
            console.log(this.props.location.state.id);
            this.db.getCollection("Topics").doc(this.props.location.state.id).update({
                "posts": prevData
            }).then(() =>{
            console.log("New Post Added to Database");
            }).catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
            });
        }
    }

    render(){
        if(this.props.location.state){
            return(
                <div className="commentBox">
                    <div className="postTextDiv">
                        <p>{this.props.location.state.text} by {this.props.location.state.username}</p>
                    </div>
                    <Form>
                        <div className="formComment">
                            <input className="inputComment" value={this.state.value} onChange={this.handleChange}/>
                            <Button className="buttonComment" onClick={this.handleSubmit}>Post Comment</Button>
                        </div>
                    </Form>
                    {this.state.comments && this.state.comments.map((comment, i) => {
                        return(
                            <Comment key={i} username={comment.username} text={comment.text}></Comment> 
                        )})}
                </div>
            );
        }
    else{
        return(
            <p>Please go back to the discussion forum</p>
        )
    }

        // if(this.props.comments.length == 0)
    }
}

export default CommentSection;