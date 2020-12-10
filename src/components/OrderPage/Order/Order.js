import React, {  Component, useEffect } from 'react';
import './Order.css'
import {Col, Container,Row} from 'react-bootstrap';
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
        else if(option ===0 )
        {
            alert("Please choose order type!")
        }
        else if(option ==="1" && (address ==="" || city==="" || state==="" || postalCode==="") ){
            alert("Please enter the address!")
        }
        else if (option ==="2" && time==="")
        {
            alert("Please enter the pick up time!")
        }
        else{
        props.NextStep();
        }
    }

    const UpdateOption =e=>{
        switch(e.target.value)
        {
            case "1" : setPage(Delivery);break;
            case "2" : setPage(PickUp);break;
            default: alert("Error for Option Page")
        }
    }



    const{ values, AddToCart,meal, drink,handleChange,cart,RemoveFromCart}=props;
    const {address,city,state,postalCode,option,time} = values;
   
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
        </Form.Row>
        )
     
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
                <div className="OrderContainer">
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
                            label="Dine in (unavailable due to pandemic)" 
                            id="EatOptions"
                            value={1}
                            name="option"
                            onClick={handleChange}
                            onChange={UpdateOption}
                            disabled="true"
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
                            <Form.Group as={Col}   
                                style={{  
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
                  <div className="Cart">
                  <Container className="Orderlist">
                <Row className="Rows">
                <h1>Cart</h1>
                </Row>
                <Row className="Rows">
                    <Col xs={4}>Item</Col>
                    <Col xs={2}>Quantity</Col>
                    <Col xs={2}>Price</Col>
                    <Col xs={2}> </Col>
                </Row>
                {  
                    cart.map((item)=>{
                        let name=""
                        let price=0;
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
                       return(
                        <Row key={item.id} className="Rows">
                                <Col xs={4} >{name}</Col>
                                <Col xs={2}>{item.quantity}</Col>
                                <Col xs={2}>$ {item.quantity * price}</Col> 
                                <Col xs={2}>
                                <Button 
                                variant="primary" 
                                value={item.id} 
                                onClick={(e)=>
                                    RemoveFromCart(e.target.value)
                                    }>
                                    Remove
                                </Button>
                                    
                                </Col>
                                </Row>
                       )
                                
                     })
                }
                <Row className="Rows">
                    <Col xs={4}></Col>
                    <Col xs={2}>Total:</Col>
                    <Col xs={2}>$ {values.total}</Col>
                    <Col xs={2}> </Col>
                </Row>

            </Container>
                  </div>
                  </div>
            </div>
           
   )
   }

