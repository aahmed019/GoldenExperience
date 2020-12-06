import React, { useState } from 'react';
import {Button, Form} from "react-bootstrap";
import Fire from '../../firebaseConfig';
import Comment from "../Comment/Comment"
import './CommentSection.css'
import Footer from "../Footer/Footer"

export default function CommentSection(props){
    const [value, setValue] = useState(''); 
    const [comments, setComments] = useState(props.location.state.comments); 
    let database = Fire.db

    // if(props.location.state){
    //     setComments(props.location.state.comments)
    // }

    const handleChange = (e) =>{
        this.setState({value: e.target.value});
    }
    const handleSubmit = (e) =>{
        let tabooList = [];
        this.db.getCollection('TabooWords').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                //let currentId = doc.id
                tabooList.push(doc.id);
                
            });
            let violation_count = 0;
            for(let i = 0; i < tabooList.length; i++){
                let ast_str = "";
                for(let j = 0; j < tabooList[i].length; j++){
                    ast_str += "*";
                }
                // temp = tabooList[i];
                let count = value.split(tabooList[i]).length - 1;;
                violation_count += count;
                value = value.replaceAll(tabooList[i], ast_str);
            }
            if(value.length > 0 && violation_count <= 3){
               let prevData = props.location.state.data.posts;
               console.log(prevData);
                for(let i = 0; i < prevData.length; i++){
                    if(prevData[i].text === props.location.state.text && prevData[i].username === props.location.state.username){
                        
                            prevData[i].comments.push({
                                "text": value,
                                "username": "rudeuser",
                                time: database.getTime()
                            })    
                    }
                }
                    this.db.getCollection("Topics").doc(props.location.state.id).update({
                        "posts": prevData
                    }).then(() =>{
                    console.log("New Post Added to Database");
                    }).catch(function(error) { //broke down somewhere
                    console.error("Error: ", error);
                    });    
                
            }
            else{
                console.log(violation_count, "violations");
            }
    
        }).catch(function(error){
            console.log(error)
        })
    }

        if(props.location.state){
            return(
                <div className="black-background">
                <div className="commentBox">
                    <div className="postTextDiv">
                        <p>{props.location.state.text} by {props.location.state.poster}</p>
                    </div>
                    <Form>
                        <div className="formComment">
                            <input className="inputComment" value={value} onChange={handleChange}/>
                            <Button className="buttonComment gold-text" onClick={handleSubmit}>Post Comment</Button>
                        </div>
                    </Form>
                    {comments && comments.map((comment, i) => {
                        return(
                            <Comment key={i} username={comment.username} text={comment.text}></Comment> 
                        )})}
                </div>
                <Footer/>
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


