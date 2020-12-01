import React, {  Component } from 'react';
import './OrderPage.css'
import Order from './Order/Order.js'
import CheckOut from './CheckOutPage/CheckOutPage'
import Confirm from './ConfirmPage/ConfirmPage'
import Success from './SuccessPage/SuccessPage'
import Fire from '../../firebaseConfig.js'
import Footer from '../Footer/Footer'



export default class OrderPage extends Component{
 
    constructor(props){
        super(props);
    this.state={
        step: 1,
        cart: [],
        MID: "",
        MNum: 1,
        DID:"",
        Dnum: 1,
        notes: "",
        address: "",
        balance: this.props.balance,
        total:0,
        address:"",
        city:"",
        state:"",
        postalCode:"",
        seatNum:"",
        time: ""
    }

    this.AddToCart =this.AddToCart.bind(this);
    this.NextStep= this.NextStep.bind(this);
    this.PrevStep= this.PrevStep.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.CalculateTotal= this.CalculateTotal.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.db =Fire.db;

    }
    componentDidMount(){
        this.db.getCollection("Food").get().then(snapshot => {
            const meal = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                meal.push([data, doc.id]);

            })
            this.setState({meal: meal});
        }).then(()=>{
            this.db.getCollection("Drink").get().then(snapshot => {
                const drink = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    drink.push([data, doc.id]);
    
                })
                this.setState({drink: drink});
        })}).catch(error => console.log(error))
    }
    AddToCart=(fid,fquantity)=> {
        let newCart = this.state.cart;
        if(fid ==="")
        { alert("Please Choose something from the list ! ")}
        else{
        fquantity = parseInt( fquantity);
       
         if( newCart.find(item=> item.id === fid) === undefined)
         {
            newCart.push({id:fid, quantity: fquantity})
         }
         else
         {
            newCart.find(item => {if(item.id === fid){
                item.quantity = item.quantity + fquantity
            }})
         }
         
        }
       
        this.setState({cart: newCart});
        console.log(JSON.stringify(this.state.cart));
        
    }
    CalculateTotal=()=>
    {   
        let totalcost=0;
        let price = 0;
        let meal = this.state.meal;
        let drink = this.state.drink;
        let cart= this.state.cart;
   
         cart.map(item=>{
            let type=item.id[0];
            if(type==='m')
            {
             price = meal.find((food)=> item.id===food[0].id  )[0].price
            }
            else{
             price = drink.find((food)=> item.id===food[0].id  )[0].price
            }  
          
            totalcost = totalcost + (price* item.quantity)
            })
        this.setState({total: totalcost} )
        
        
    }
    NextStep=()=>{
        const{step} =this.state;
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
        const{step, cart, address, balance, meal, drink,MID,MNum,DID,DNum,notes,total}=this.state;
        const values= {MID,MNum,DID,DNum,notes}
        const checkoutvalues={cart,address,balance,total}
        
        switch(step)
    {
        case 1: return ( <div>
                            <Order 
                            NextStep={this.NextStep}
                            handleChange={this.handleChange}
                            AddToCart={this.AddToCart}
                            values={values}
                            meal={meal}
                            drink={drink}
                            /><Footer/>
                            </div>)
        case 2: return(     <div>
                            <CheckOut 
                            CalculateTotal={this.CalculateTotal}
                            checkoutvalues={checkoutvalues}
                            meal ={meal}
                            drink={drink}
                            NextStep={this.NextStep}
                            PrevStep={this.PrevStep}
                            handleChange={this.handleChange}
                            /> <Footer/>
                            </div>)
        case 3: return(     <div>
                            <Confirm
                            NextStep={this.NextStep}
                            PrevStep={this.PrevStep}
                            handleChange={this.handleChange}
                            /><Footer/>
                            </div>
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