import React, {  Component } from 'react';
import './Order.css'
import {Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'



export default class Order extends Component {
 
    
    continue = e =>{
        e.preventDefault();
        this.props.NextStep();
    }


render(){
    const{ values, handleChange, AddToCart }=this.props;

   return (
            <div className="background-boi">
                  <div className="Order" >
                  <Form className="FormControl" >
                      <Form.Row className="Rows" >
                      <Form.Group as={Col} className="Cols" xs={3}>
                            <Form.Label>Meal:</Form.Label>
                            <Form.Control as="select" custom onChange={()=>handleChange('MID')}>
                                <option id="mealID" value="m1">m1</option>
                                <option id="mealID" value="m2">m2</option>
                                <option id="mealID" value="m3">m3</option>
                                <option id="mealID" value="m4">m4</option>
                            </Form.Control>
                       </Form.Group>

                       <Form.Group as={Col}  xs={3}>
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number"  min="1" max="100"  id="mealQuantity" onChange={handleChange('MNum')} />
                       </Form.Group>

                        <Form.Group as={Col} xs="auto" className="ButtonCols">
                        <Button variant="primary" onClick={()=>AddToCart(values['MID'],values['MNum'])} > Add  to Cart</Button>
                        </Form.Group>

                      </Form.Row>
                    
                      <Form.Row className="Rows" >
                      <Form.Group as={Col} className="Cols" xs={3}>
                            <Form.Label>Drink:</Form.Label>
                            <Form.Control as="select" custom  onChange={handleChange('DID')} >
                                <option id="drinkId" value="d1">d1</option>
                                <option id="drinkId" value="d2">d2</option>
                                <option id="drinkId" value="d3">d3</option>
                                <option id="drinkId" value="d4">d4</option>
                            </Form.Control>
                       </Form.Group>

                       <Form.Group as={Col}  xs={3}>
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number"  min="1" max="100" id="drinkQunatity"  onChange={handleChange('DNum')}/>
                       </Form.Group>

                        <Form.Group as={Col}  xs="auto" className="ButtonCols"  >
                            <Button variant="primary" onClick={()=>AddToCart(values['DID'],values['DNum'])}  > Add to Cart </Button>
                        </Form.Group>

                      </Form.Row>
                      
                      <Form.Row className="Rows"  >
                          <Form.Group as={Col}  xs="10" className="ButtonCols" >
                          <Form.Control as="textarea" placeholder="Notes" className="Notes" onChange={handleChange('notes')}> 
                            </Form.Control>
                          </Form.Group>

                      </Form.Row>
                      <Form.Row >                        
                          <Button variant="primary" onClick={this.continue} >Check Out</Button>
                      </Form.Row>
                  </Form>
                  </div>
            </div>
           
   )
   }

}