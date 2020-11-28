import React, { Component } from 'react';
export default class Image extends Component {
 render(){
  return( <img src={this.props.source} alt={this.props.text} /> )
 }
}