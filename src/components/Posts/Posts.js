import React, { Component } from 'react';


class Posts extends Component{
    constructor(props) { 
        super(props);
   
        this.state = {
            topics : []
        }
        // this.componentDidMount = this.componentDidMount.bind(this);
    }
    render(){
        const { data } = this.props.location.state;
        console.log(data);
        return(<p>{this.props.name}</p>)
    }

}
export default Posts;