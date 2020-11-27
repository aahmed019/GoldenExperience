import React, { useEffect, useState } from 'react';
import './OrderPage.css'
import Fire from '../../firebaseConfig';

const storage = Fire.db.getStorage();

export default class OrderPage extends React.Component{
    constructor(props)
    {
        super(props);
        
        this.state = {result : " "};
    
        //for handling events
        this.handleClick=this.handleClick.bind(this);
    }
    //similar to componentDidMount
 
     handleClick(){

        console.log('Order placed ! ')
        this.setState({result : "Order placed!"})
    }

render(){
    return(
        <div className ='container'>
            <div>
                <h2>Order</h2>
                
               <input type='button' value="Order" onClick={()=>{this.handleClick();}}/>
               <h3>{this.state.result}</h3>
            </div>
                       
        </div>
    )
}
}