import React, {  Component } from 'react';
import './OrderPage.css'
import Order from './Order/Order.js'
import CheckOut from './CheckOutPage/CheckOutPage'
import Confirm from './ConfirmPage/ConfirmPage'
import Success from './SuccessPage/SuccessPage'
import Fire from '../../firebaseConfig.js'
import Footer from '../Footer/Footer'
const storage = Fire.db.getStorage();


export default class OrderPage extends Component{
 
    state={
        step: 1,
        cart: [],
        MID: 'm1',
        MNum: 1,
        DID: 'd1',
        Dnum: 1,
        notes: "",
        address: "",
        balance: this.props.balance
    }
    AddToCart=(fid,fquantity)=> {

        let newCart = this.state.cart;
        newCart.push({id: fid, quantity: fquantity})
        this.setState({cart: newCart});
        console.log(JSON.stringify(this.state.cart));
        
    }
    NextStep=()=>{
        const{step, cart} =this.state;
        this.setState({step: step+1});
    }
    PrevStep=()=>{
        const{step} =this.state;
        this.setState({step: step-1});
    }
    handleChange =input => e =>{
        this.setState({[input] : e.target.value})
    }
    render(){
        const{step, cart, address, balance}=this.state;
        const{MID,MNum,DID,DNum,notes} = this.state;
        const values= {MID,MNum,DID,DNum,notes}
        const checkoutvalues={cart,address,balance}
        
        switch(step)
    {
        case 1: return ( <div><Order 
                            NextStep={this.NextStep}
                            handleChange={this.handleChange}
                            AddToCart={this.AddToCart}
                            values={values}
                        /><Footer/></div>)
        case 2: return(     <div>
                            <CheckOut 
                            checkoutvalues={this.checkoutvalues}
                            NextStep={this.NextStep}
                            PrevStep={this.PrevStep}
                            handleChange={this.handleChange}
                        /> <Footer/></div>)
        case 3: return(     <div>
                            <Confirm
                            NextStep={this.NextStep}
                            PrevStep={this.PrevStep}
                            handleChange={this.handleChange}
        /><Footer/></div>
        )
        case 4: return(
                    <div>
                <Success
            PrevStep={this.PrevStep}
            handleChange={this.handleChange}
                        /><Footer/>
                        </div>
                        )
        default: return(
        <div>
            <Order 
            NextStep={this.NextStep}
            handleChange={this.handleChange}
            AddToCart={this.AddToCart}
            values={values}
        />
        <Footer/>
        </div>
        )
    }

    }
    


   
    

}