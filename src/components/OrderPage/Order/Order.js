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
    const{CalculateTotal, values, handleChange, AddToCart,meal, drink }=this.props;


   return (
            <div className="background-boi">
                  <div className="Order" >
                  <Form className="FormControl" >
                      <Form.Row className="Rows" >
                      <Form.Group as={Col} className="Cols" xs={3}>
                            <Form.Label>Meal:</Form.Label>
                            <Form.Control as="select" custom onChange={handleChange('MID')} >
                            <option></option>
                            {meal && meal.map((food, i) => {
                                 return(
                            <option key={i} value={food[0].id} >{food[0].name}</option> 
                                     )})}
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
                            <option> </option>
                            {drink && drink.map((food, i) => {
                                 return(
                            <option key={i} value={food[0].id}>{food[0].name}</option> 
                                     )})}
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