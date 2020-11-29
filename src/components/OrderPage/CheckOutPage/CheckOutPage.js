import React, {  Component } from 'react';
import './CheckOutPage.css'
import Button from 'react-bootstrap/Button';

export default class CheckOutPage  extends Component{
continue= e=>{
    e.preventDefault();
    this.props.NextStep();
}
goBack= e=>{
    e.preventDefault();
    this.props.PrevStep();
}
render(){
    return(
        <div className="CheckOut">
        <h1>Check Out Page</h1>
        <div>
        <Button variant="primary"  onClick={this.goBack}>Go Back</Button>
        <Button variant="primary"  onClick={this.continue}>Order</Button>
        </div>
    </div>
    )
}

}