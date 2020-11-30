import React, {  Component } from 'react';
import './CheckOutPage.css'
import Button from 'react-bootstrap/Button';
import {Row,Col,Container} from 'react-bootstrap'
export default class CheckOutPage  extends Component{

constructor(props)
{
    super(props);
    this.componentDidMount= this.componentDidMount.bind(this);
   
}

componentDidMount(){
  this.props.CalculateTotal();
}

continue= e=>{
    e.preventDefault();
    this.props.NextStep();
}
goBack= e=>{
    e.preventDefault();
    this.props.PrevStep();
}
render(){
    const{checkoutvalues ,handleChange,meal,drink} = this.props;
    const{cart,total }= checkoutvalues;
 
    

    return(
        <div className="CheckOut">
     
        <h1>Check Out Page</h1>
  
            <Container className="Orderlist">
                <Row className="Rows">
                    <Col>Item</Col>
                    <Col>Quantity</Col>
                    <Col>Price</Col>
                </Row>
                {
                    cart.map((item)=>{
                        let name=""
                        let price=0;
                       // alert(item)
                        let type=item.id[0];
                        if(type==='m')
                        {
                         name = meal.find(food=> item.id===food[0].id)[0].name
                         price = meal.find((food)=> item.id===food[0].id  )[0].price
                        }
                        else{
                         name = drink.find(food=> item.id===food[0].id)[0].name
                         price = drink.find((food)=> item.id===food[0].id  )[0].price
                        }
                        //alert(price); 
                        return (<Row key={item.id} className="Rows">
                                <Col>{name}</Col>
                                <Col>{item.quantity}</Col>
                                <Col>$ {item.quantity * price}</Col> 
                                </Row>
                                )
                     })
                }
                <Row className="Rows">
                    <Col></Col>
                    <Col>Total:</Col>
                    <Col>$ {total}</Col>
                </Row>
                <Row className="Rows">
                    <Col xs={5}> <Button variant="primary"  onClick={this.goBack}>Go Back</Button></Col>
                    <Col xs={5}><Button variant="primary"  onClick={this.continue}>Next</Button></Col>
                </Row>
            </Container>
       

    </div>
    )
}

}