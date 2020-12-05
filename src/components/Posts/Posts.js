import React, {useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Button, Modal} from "react-bootstrap";
import Post from "../Post/Post"
import './Posts.css'
import 'bootstrap/dist/css/bootstrap.css';
import PostModal from '../PostModal/PostModal'
import Footer from '../Footer/Footer';
import { useAuth } from "../../contexts/AuthContext"
import props from 'prop-types';

export default function Posts(props){
    const [data, setData] = useState(''); 
    const [show, setShow] = useState(false); 
    const [id, setId] = useState(''); 

    const handleShow = () =>{
        setShow(true);
    }  
    const handleClose = () =>{
        setShow(false);
    }  
    const showModal = () =>{
        return show;
    }  
    const getData = async() =>{
        if(props.location.state){
            setData(props.location.state.data);
            setId(props.location.state.id);    
        }
    }   
    useEffect(() =>{
        getData()
        // getUser()
    },[])
       

    if(data){
        return(
            <div className="black-background">
                <div>{data.posts && data.posts.map((post, i) => {
                    let date = ""
                    if(post.time){
                        // SimpleDateFormat sfd = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
                        // sfd.format(new Date(timestamp));
                        date = new Date(post.time.seconds*1000).toString()
                        // console.log(post.time.toString());
                        // date = post.time.toDate().toString();
                    }
                    return(
                        <Post data={data} comments={post.comments} id={id} key={i} username={post.username} text={post.text} time={date}></Post> 
                    )})}
                </div>
                
                <div><Button className="newpost" onClick={handleShow}>Create New Post</Button></div>
                <PostModal data={data} id={id} show={show} handleClose={handleClose}></PostModal>
                <Footer/>
            </div>
        );
        }
        else{
            return(
                <Row>Please go back to discussion forum and choose a topic</Row>
            )
        }
    }
