import React, {useEffect,  useState } from 'react';
import {Button, Form} from "react-bootstrap";
import Fire from '../../firebaseConfig';
import Comment from "../Comment/Comment"
import './CommentSection.css'
import Footer from "../Footer/Footer"
import Notifications, {notify} from 'react-notify-toast';
import { useAuth } from "../../contexts/AuthContext"

export default function CommentSection(props){
    const [value, setValue] = useState(''); 
    const [comments, setComments] = useState(props.location.state.comments); 
    let database = Fire.db
    const [username, setUsername] = useState(true);
    const [email, setEmail] = useState(true);
    const { currentUser, logout } = useAuth()
    const [userAuthorize, setAuthorize] = useState(true);


    // if(props.location.state){
    //     setComments(props.location.state.comments)
    // }

    const getUser = async() =>{
        if(currentUser){
            database.getCollection('Users').doc(currentUser.email).get().then(function(doc){
                if(!doc.exists){
                    setAuthorize(false);
                }
                else{
                    setUsername(doc.data().username)
                    setEmail(doc.data().email)
                }
            })    
        }
    }
    useEffect(() =>{
        // getPosts()
        // getData()
        getUser()
    },[])

    const deRegisterUser = (email) => {
        database.getCollection('Users').doc(email).delete()
        .then(() =>{
            notify.show('Stop cursing! You have been deregistered!');
            window.location.reload(false);
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });
    }

    const removeVIP = (email) => {
        database.getCollection('SignUp').doc(email).update({
            Vip: "false",
            warnings: 0
          })
        database.getCollection('Users').doc(email).update({
            Vip: "false",
            warnings: 0
        }).then(() => {
            notify.show('Stop cursing! Your VIP status has been removed!');
        })
    }

    const addWarning = (username, email) =>{
        database.getCollection('Users').doc(email).get().then(function(doc){
            let new_warnings = 0;
            let vip_status = false;
            if(doc.exists){
              new_warnings = doc.data().warnings + 1;
              vip_status = doc.data().Vip;
              console.log(vip_status)
              database.getCollection('Users').doc(email).update({
                warnings: new_warnings,
              })
              database.getCollection('SignUp').doc(email).update({
                warnings: new_warnings,
              })
              if(new_warnings >= 2 && vip_status == "true"){
                removeVIP(email);
              }
              else if(new_warnings >= 3 && vip_status == "false"){
                deRegisterUser(email);
              }else{
                notify.show('Stop cursing! A warning has been added to your account!');
              }
           
            }
        })
    }

    const handleChange = (e) =>{
        this.setState({value: e.target.value});
    }
    const handleSubmit = (e) =>{
        let tabooList = [];
        database.getCollection('TabooWords').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                //let currentId = doc.id
                tabooList.push(doc.id);
                
            });
            let violation_count = 0;
            let new_val = value;
            for(let i = 0; i < tabooList.length; i++){

                let ast_str = "";
                for(let j = 0; j < tabooList[i].length; j++){
                    ast_str += "*";
                }
                // temp = tabooList[i];
                let count = value.split(tabooList[i]).length - 1;
                violation_count += count;
                new_val = new_val.replaceAll(tabooList[i], ast_str)
                setValue(new_val)
            }
            if(value.length > 0 && violation_count <= 3){
                if(violation_count > 0){
                    addWarning(username, props.email);
                }
               let prevData = props.location.state.data.posts;
               console.log(prevData);
                for(let i = 0; i < prevData.length; i++){
                    if(prevData[i].text === props.location.state.text && prevData[i].username === props.location.state.poster){
                            prevData[i].comments.push({
                                "text": value,
                                "username": username,
                                time: database.getTime()
                            })    
                    }
                }
                console.log(prevData)
                    database.getCollection("Topics").doc(props.location.state.id).update({
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
    if(userAuthorize == false){
        return(<div>You need to be approved to view this page</div>)
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
                            <input className="inputComment" value={value} onChange={e => setValue(e.target.value)}/>
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


