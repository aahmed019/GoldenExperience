import React, { Component } from 'react';
import Footer from '../Footer/Footer.js'
import {Row} from "react-bootstrap";
import Topic from '../Topic/Topic';
import {db} from '../Firebase/firebase'

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
                <Row>
        <p>Welcome to the discussion forum</p>
        {this.state.topics && this.state.topics.map(topic => {
            return(
                <Topic name={topic.name} data={topic}></Topic> 
            )})}
                </Row>
            <Footer/>
            </div>
           
        )
    }
}
export default DiscussionPage;