import React, {  Component } from 'react';
import './Order.css'
import {Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {useState} from 'react'


export default function Order (props) {

    const[OptionPage,setPage]=useState((<div/>))

    const Next = e =>{
        e.preventDefault();
        const cart1 = props.cart.length;
        if(cart1<=0)
        { alert("Please add something to the cart")}
        else{
        props.NextStep();
        }
    }

    const UpdateOption =e=>{
        switch(e.target.value)
        {
            case "0" : setPage(DineIn);break;
            case "1" : setPage(Delivery);break;
            case "2" : setPage(PickUp);break;
            default: alert("Error for Option Page")
        }
    }


    const{ values, AddToCart,meal, drink,handleChange }=props;
   
  // Only for Reserving Seats may need to be in other pages ( Restaurant Page)
    const DineIn=(
        
        <Form.Row className="Rows ">
        <Form.Group as={Col} xs={10}> 
              <Form.Label>Seat Number:</Form.Label>
              <Form.Control type="text" name="seatNumber" onChange={handleChange} values={values.seatNumber} ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} xs={10}> 
              <Form.Label>Time:</Form.Label>
              <Form.Control type="text" name="title" onChange={handleChange } placeholder="Time in HH:MM" ></Form.Control>
              </Form.Group>
        </Form.Row>)
     
 ///   
     const Delivery= (
            <Form.Row>
            <Form.Row className="Rows ">
            <Form.Group as={Col} xs={6}> 
                  <Form.Label>Address:</Form.Label>
                  <Form.Control type="text" name="address" onChange={handleChange} ></Form.Control>
                  </Form.Group>
            </Form.Row>
            <Form.Row className="Rows ">
                  <Form.Group as={Col} xs={3}>
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" name="city" onChange={handleChange} ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} xs={3}>
                      <Form.Label>State</Form.Label>
                      <Form.Control type="text" name="state" onChange={handleChange} ></Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} xs={3}>
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control type="text" name="postalCode" onChange={handleChange} ></Form.Control>
                  </Form.Group>
            </Form.Row>
            </Form.Row>)
    
    const PickUp= (
        <Form.Row className="Rows ">
        <Form.Group as={Col} xs={10}> 
              <Form.Label>Pick Up Time:</Form.Label>
              <Form.Control type="text" name="time" onChange={handleChange} placeholder="Time (HH:MM)" ></Form.Control>
              </Form.Group>
        </Form.Row>)
    

  

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
                            <Form.Control as="select"custom  name="MID" onChange={handleChange} value={values.MID} >
                            <option></option>
                            {meal && meal.map((food, i) => {
                                 return(
                            <option key={i} value={food[0].id} >{food[0].name}</option> 
                                     )})}
                            </Form.Control>
                       </Form.Group>

                       <Form.Group as={Col}  xs={3}>
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number"  min="1" max="100"  id="mealQuantity" name="MNum" onChange={handleChange}  />
                       </Form.Group>

                        <Form.Group as={Col} xs="auto" className="ButtonCols">
                        <Button variant="primary" onClick={()=>AddToCart(values['MID'],values['MNum'])} > Add  to Cart</Button>
                        </Form.Group>

                      </Form.Row>
                    
                      <Form.Row className="Rows" >
                      <Form.Group as={Col}   xs={3}>
                            <Form.Label>Drink:</Form.Label>
                            <Form.Control as="select" custom name="DID" onChange={handleChange} value={values.DID} >
                            <option> </option>
                            {drink && drink.map((food, i) => {
                                 return(
                            <option key={i} value={food[0].id}>{food[0].name}</option> 
                                 )})}
                            </Form.Control>
                       </Form.Group>

                       <Form.Group as={Col}  xs={3}>
                            <Form.Label>Quantity:</Form.Label>
                            <Form.Control type="number"  min="1" max="100" id="drinkQunatity" name="DNum" onChange={handleChange} />
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
                            name="option"
                            id="EatOptions"
                            value={0}
                            onClick={handleChange}
                            onChange={UpdateOption}
                            />
                            
                           
                            <Form.Check
                            inline
                            type="radio"
                            label="Delivery"
                            
                            id="EatOptions"
                            value={1}
                            name="option"
                            onClick={handleChange}
                            onChange={UpdateOption}
                            />

                            <Form.Check
                            inline
                            type="radio"
                            label="Pick Up"
                            
                            id="EatOptions"
                            value={2}
                            onClick={handleChange}
                            name="option"
                            onChange={UpdateOption}
                            />
                      </Form.Row>
                        {OptionPage}
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
                                name="notes"
                                onChange={handleChange}
                                value={values.notes}
                    
                                 />  
                            </Form.Group>
                        </Form.Row>
                      <Form.Row className="Rows" >                        
                          <Button variant="primary" onClick={Next} >Check Out</Button>
                      </Form.Row>
                  </Form>
                  </div>
            </div>
           
   )
   }

