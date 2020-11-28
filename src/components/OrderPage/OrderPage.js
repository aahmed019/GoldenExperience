import React, { useEffect, useState } from 'react';
import './OrderPage.css'
import Fire from '../../firebaseConfig';
import {Row,Col} from 'react-bootstrap';
import CounterInput from 'react-bootstrap-counter';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
const storage = Fire.db.getStorage();

export default class OrderPage extends React.Component{
    constructor(props)
    {
        super(props);
        this.state= {
            step : 0,
            meal:'' /*[{meal_id:0, meal_name:'', meal_descript:'', rating:0, price:0.0}]*/,
            order:'' /* [{meal_id:0, quantity: 0}]*/
        }  
    }
    //proceed to the next step
    nextStep= ()=>{
        const {step} =this.state;
        this.setState({
            step: step + 1
        })
    }
    handleChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    }
 


render(){
   return (
            <div className="background-boi">
                  <div class="Order" >
                  <Form className="FormControl" >
                      <Form.Row className="Rows">
                      <Form.Group as={Col} class="Cols" xs={3}>
                            <Form.Label>Meal:</Form.Label>
                            <Form.Control as="select" custom  >
                                <option id="mealID">1</option>
                            </Form.Control>
                       </Form.Group>

                       <Form.Group as={Col}  xs={3}>
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number"  min="1" max="100"  id="mealQuantity"  />
                       </Form.Group>

                        <Form.Group as={Col} xs="auto" className="ButtonCols">
                        <Button variant="primary" type="submit" > Add  to Cart</Button>
                        </Form.Group>

                      </Form.Row>
                    
                      <Form.Row className="Rows">
                      <Form.Group as={Col} class="Cols" xs={3}>
                            <Form.Label>Drink:</Form.Label>
                            <Form.Control as="select" custom  >
                                <option id="drinkId">1</option>
                            </Form.Control>
                       </Form.Group>

                       <Form.Group as={Col}  xs={3}>
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number"  min="1" max="100" id="drinkQunatity" />
                       </Form.Group>

                        <Form.Group as={Col}  xs="auto" className="ButtonCols"  >
                            <Button variant="primary" type="submit" > Add to Cart </Button>
                        </Form.Group>

                      </Form.Row>
                      
                      <Form.Row className="Rows">
                          <Form.Group as={Col} xs="11" >
                          <Form.Control as="textarea" placeholder="Notes">
                            </Form.Control>
                          </Form.Group>

                      </Form.Row>
                      <Form.Row className="Rows">
                          
                          <Button variant="primary" type="submit">Check Out</Button>
                            
                         

                      </Form.Row>
                  </Form>
                  </div>
                  
            </div>
           
   )
    
}
}