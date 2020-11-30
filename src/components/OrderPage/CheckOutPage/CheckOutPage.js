import React, {  Component } from 'react';
import './CheckOutPage.css'
import Button from 'react-bootstrap/Button';
import {Row,Col} from 'react-bootstrap'
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
    const{checkoutvalues} = this.props;
    const{cart} = this.checkoutvalues;
    return(
        <div className="CheckOut">
        <h1>Check Out Page</h1>
        <div>
            <Row>
                <Row>
                    <Col>Item</Col>
                    <Col>Quantity</Col>
                    <Col>Price</Col>
                </Row>
            
            </Row>
        </div>
        <div>
        <Button variant="primary"  onClick={this.goBack}>Go Back</Button>
        <Button variant="primary"  onClick={this.continue}>Next</Button>
        </div>
    </div>
    )
}

}