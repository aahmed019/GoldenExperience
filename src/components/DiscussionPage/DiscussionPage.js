import React, { Component } from 'react';
import Footer from '../Footer/Footer.js'
import {Row} from "react-bootstrap";
import Topic from '../Topic/Topic';
import {db} from '../Firebase/firebase'
import './DiscussionPage.css'

class DiscussionPage extends Component{
    
    constructor(props) { 
        super(props);
   
        this.state = {
            topics : []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }
        componentDidMount(){
        db.collection("Topics").get().then(snapshot => {
            const topics = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                topics.push(data);
            })
            this.setState({topics: topics});
        }).catch(error => console.log(error))
    }        
    render(){
        return(
            <div>
                <div>
        <h1>Welcome to the discussion forum</h1>
        {this.state.topics && this.state.topics.map(topic => {
            return(
                <Topic name={topic.name} data={topic}></Topic> 
            )})}
                </div>
            <Footer/>
            </div>
           
        )
    }
}
export default DiscussionPage;