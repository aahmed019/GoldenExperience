import React, {  Component } from 'react';
import './Order.css'
import {Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


export default class Order extends Component {
    constructor(props){
        super(props);
        this.state={ 
           
        }
        
    }
    continue = e =>{
        e.preventDefault();
        const cart1 = this.props.cart.length;
        if(cart1<=0)
        { alert("Please add something to the cart")}
        else{
        this.props.NextStep();
        }
    }


render(){
    const{ values, handleChange, AddToCart,meal, drink }=this.props;
  // Only for Reserving Seats may need to be in other pages ( Restaurant Page)
    function DineIn() {
        return(
        <Form.Row className="Rows ">
        <Form.Group as={Col} xs={10}> 
              <Form.Label>Seat Number:</Form.Label>
              <Form.Control type="text" onChange={handleChange('seatNumber')} values={values.seatNumber} ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} xs={10}> 
              <Form.Label>Time:</Form.Label>
              <Form.Control type="text" onChange={handleChange('time') } placeholder="Time in HH:MM" ></Form.Control>
              </Form.Group>
        </Form.Row>)
     }
 ///   
     function Delivery(){
        return(
            <Form.Row>
            <Form.Row className="Rows ">
            <Form.Group as={Col} xs={6}> 
                  <Form.Label>Address:</Form.Label>
                  <Form.Control type="text" onChange={handleChange('address')} ></Form.Control>
                  </Form.Group>
            </Form.Row>
            <Form.Row className="Rows ">
                  <Form.Group as={Col} xs={2}>
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" onChange={handleChange('city')} ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} xs={2}>
                      <Form.Label>State</Form.Label>
                      <Form.Control type="text" onChange={handleChange('state')} ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} xs={2}>
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control type="text" onChange={handleChange('postalCode')} ></Form.Control>
                  </Form.Group>
            </Form.Row>
            </Form.Row>)
    }

    function PickUp(){
        return (
        <Form.Row className="Rows ">
        <Form.Group as={Col} xs={10}> 
              <Form.Label>Pick Up Time:</Form.Label>
              <Form.Control type="text" onChange={handleChange('time')} placeholder="Time (HH:MM)" ></Form.Control>
              </Form.Group>
        </Form.Row>)
    }

  

   return (
            <div className="background-boi">
                  <div className="Order">
                  <Form className="FormControl" >
                      <Form.Row className="Rows">
                          <h3>Place Order</h3>
                      </Form.Row>
                      <Form.Row className="Rows" >
                      <Form.Group as={Col} className="Cols" xs={3}>
                            <Form.Label>Meal:</Form.Label>
                            <Form.Control as="select" custom onChange={handleChange('MID')} value={values.MID} >
                            <option></option>
                            {meal && meal.map((food, i) => {
                                 return(
                            <option key={i} value={food[0].id} >{food[0].name}</option> 
                                     )})}
                            </Form.Control>
                       </Form.Group>

                       <Form.Group as={Col}  xs={3}>
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number"  min="1" max="100"  id="mealQuantity" onChange={handleChange('MNum')}  />
                       </Form.Group>

                        <Form.Group as={Col} xs="auto" className="ButtonCols">
                        <Button variant="primary" onClick={()=>AddToCart(values['MID'],values['MNum'])} > Add  to Cart</Button>
                        </Form.Group>

                      </Form.Row>
                    
                      <Form.Row className="Rows" >
                      <Form.Group as={Col}   xs={3}>
                            <Form.Label>Drink:</Form.Label>
                            <Form.Control as="select" custom  onChange={handleChange('DID')} value={values.DID} >
                            <option> </option>
                            {drink && drink.map((food, i) => {
                                 return(
                            <option key={i} value={food[0].id}>{food[0].name}</option> 
                                     )})}
                            </Form.Control>
                       </Form.Group>

                       <Form.Group as={Col}  xs={3}>
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number"  min="1" max="100" id="drinkQunatity"  onChange={handleChange('DNum')} />
                       </Form.Group>

                        <Form.Group as={Col}  xs="auto" className="ButtonCols"  >
                            <Button variant="primary" onClick={()=>AddToCart(values['DID'],values['DNum'])}  > Add to Cart </Button>
                        </Form.Group>

                      </Form.Row>
                      

                      <Form.Row className="Rows">
                          
                            <Form.Check
                            inline
                            type="radio"
                            label="Dine In"
                            name="EatOptions"
                            id="EatOptions"
                            value={0}
                            onClick={handleChange('option')}
                            onChange={()=> this.setState({OptionPage:  DineIn() })}
                            />
                            
                           
                            <Form.Check
                            inline
                            type="radio"
                            label="Delivery"
                            name="EatOptions"
                            id="EatOptions"
                            value={1}
                            onClick={handleChange('option')}
                            onChange={()=>
                                this.setState({OptionPage:  Delivery() })
                                
                        }
                            />

                            <Form.Check
                            inline
                            type="radio"
                            label="Pick Up"
                            name="EatOptions"
                            id="EatOptions"
                            value={2}
                            onClick={handleChange('option')}
                            onChange={()=>this.setState({OptionPage: PickUp()})}
                            />
                      </Form.Row>
                        {this.state.OptionPage}
                        <Form.Row className="Rows">
                            <Form.Group as={Col}   style={{
                                    
                                    display:'flex', 
                                    flexDirection:'row',
                                    alignItems:'center',
                                    justifyContent:'center'}}>
                                <Form.Control 
                                as="textarea"
                                placeholder="Notes"
                                style={{height:'100px' ,maxWidth:'500px'}}
                                onChange={handleChange('notes')}
                                value={values.notes}
                    
                                 />  
                            </Form.Group>
                        </Form.Row>
                      <Form.Row className="Rows" >                        
                          <Button variant="primary" onClick={this.continue} >Check Out</Button>
                      </Form.Row>
                  </Form>
                  </div>
            </div>
           
   )
   }

}