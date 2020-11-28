import React, { useEffect, useState } from 'react';
import './OrderPage.css'
import Fire from '../../firebaseConfig';
import Form from 'react-bootstrap/Form'
import CheckOutPage from './CheckOutPage/CheckOutPage.js'
import ConfirmPage from './ConfirmPage/ConfirmPage.js'
import SuccessPage from './SuccessPage/SuccessPage.js'

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
    const {step} = this.state;
    const{ order }  = this.state;
      switch(step){
          case 0: return (
              <div className="Order">
                <Form  >

                <Form.Group controlId="meal">
                    <Form.Label>Meal</Form.Label>
                    <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Example select</Form.Label>
                    <Form.Control as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                </Form>

              </div>
           
          )
          case 1: return (<CheckOutPage nextStep ={this.nextStep} 
          handleChange ={this.handleChange}
          order={order}/>)
         
          case 2: return (<ConfirmPage/>)
          case 3: return (<SuccessPage />)
      }
    
}
}