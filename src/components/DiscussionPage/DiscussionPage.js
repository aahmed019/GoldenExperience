import React, { Component } from 'react';
import Footer from '../Footer/Footer.js'
import Topic from '../Topic/Topic';
import Fire from '../../firebaseConfig';
import './DiscussionPage.css'

class DiscussionPage extends Component{
    
    constructor(props) { 
        super(props);
   
        this.state = {
            topics : []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.db = Fire.db;
    }
        componentDidMount(){
        this.db.getCollection("Topics").get().then(snapshot => {
            const topics = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                topics.push([data, doc.id]);

            })
            this.setState({topics: topics});
        }).catch(error => console.log(error))
    }        
    render(){
        return(
            <div>
                <div>
        <h1>Welcome to the discussion forum</h1>
        {this.state.topics && this.state.topics.map((topic, i) => {
            return(
                <Topic key={i} name={topic[0].name} data={topic[0]} id={topic[1]}></Topic> 
            )})}
                </div>
            <Footer/>
            </div>
           
        )
    }
}
export default DiscussionPage;