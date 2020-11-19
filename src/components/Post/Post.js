import React, { Component } from 'react';

class Post extends Component{
    render(){
        return(<p>{this.props.username} said {this.props.text} at {this.props.time}</p>)
    }
}

export default Post;
