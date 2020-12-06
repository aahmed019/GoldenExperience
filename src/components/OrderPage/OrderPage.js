import React, {  useState, useEffect } from 'react';
import './OrderPage.css'
import Order from './Order/Order.js'
import CheckOut from './CheckOutPage/CheckOutPage'
import Success from './SuccessPage/SuccessPage'
import Fire from '../../firebaseConfig.js'
import Footer from '../Footer/Footer'
import { useAuth } from '../../contexts/AuthContext'



export default function OrderPage (){
 
    const [userAuthorize, setAuthorize] = useState(true);
    const [step,setStep]= useState(1)
    const [cart,setCart]= useState([])
    const [MID,setMID]= useState("")
    const [MNum,setMNum]= useState(1)
    const [DID,setDID]= useState("")
    const [DNum,setDNum]= useState(1)
    const [notes,setNotes]= useState("")
    const [address,setAddress]= useState("")
    const [balance,setBalance]= useState(0)
    const [total,setTotal]= useState(0)
    const [city,setCity]= useState("")
    const [state,setState]=useState("")
    const [postalCode,setPostalCode]= useState("")
    const [time,setTime]= useState("")
    const [option,setOption]= useState(1)
    const [meal,setMeal]= useState([])
    const [drink,setDrink]= useState([])
    const [UserName,setUserName]= useState("")
    const db =Fire.db;

    const{currentUser}=useAuth();

    const getData = async() =>{
        
        db.getCollection("Food").get().then(snapshot => {
            const meal = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                meal.push([data, doc.id]);

            })
            setMeal(meal);
        }).then(()=>{
            db.getCollection("Drink").get().then(snapshot => {
                const drink = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    drink.push([data, doc.id]);
    
                })
                setDrink( drink);
        })}).then(()=>{
            if(currentUser === null)
            {setAuthorize(false)} // check if currentUser is logged in or not 
            else{
            db.getCollection("Users").doc(currentUser.email).get().then(doc => {
                let usersbalance = 0;
                let username ="";
               
                if(doc.exists){
                    const data = doc.data();
                    usersbalance= data.Balance;
                    username= data.name;
                    setUserName(username);
                    setBalance(usersbalance);
                }
                else if (!doc.exists)
                {
                    setAuthorize(false)
                }
            


            })
        }}).catch(error => console.log(error))
    }

    useEffect(()=>{

        getData();

    },[])
    function AddToCart(fid,fquantity) {
        let newCart = cart;
        console.log("fid: "+fid+"\n"+"fquantity: "+fquantity);
        if(fid ==="")
        { alert("Please choose something from the list ! ")}
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
         CalculateTotal();
         getData();
        }
       
        setCart( newCart);
        console.log(JSON.stringify(cart));
        
    }
    function  CalculateTotal(){
    
        let totalcost=0;
        let price = 0;
   
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
         setTotal(totalcost)
        
        
    }
    function UpdateBalance(){
        if(balance < total)
        {
            alert("Insufficient fund.")
        }
        else if(balance === 0)
        {
            alert("Your balance is 0")
        }
        else{
            let bal= balance;
            let cost = total;
            bal = bal- cost;
            setBalance( bal)
            alert("Your order has been placed !")
        }
    }
   function NextStep(){
       
        setStep( step+1);
    }
    function PrevStep(){
       
        setStep( step-1);
    }
    function startOver()
    {
        setCart([]);
        setStep(1);
        setAddress("");
        setTime("");
        setNotes("");
        setOption(1);
    }
    const handleChange = e=> {
        switch(e.target.name)
        {
            case "MID": setMID(e.target.value);break
            case "MNum": setMNum(e.target.value);break
            case "DID": setDID(e.target.value);break
            case "DNum": setDNum(e.target.value);break
            case "notes": setNotes(e.target.value);break
            case "address": setAddress(e.target.value);break
            case "city": setCity(e.target.value);break
            case "state": setState(e.target.value);break
            case "postalCode": setPostalCode(e.target.value);break
            case "cart": setCart(e.target.value);break
            case "time": setTime(e.target.value);break
            case "total": setTotal(e.target.value);break
            case "option": setOption(e.target.value);break
            case "balance": setBalance(e.target.value);break
            default: console.log("Error in setStates")
        }  


        
    }
    function RemoveFromCart(fid){
        let newCart = cart;
        let Meal = meal;
        let Drink = drink;
        let reduce 
        let totalnew= total;
        if(fid[0]==="m")
        {
            reduce = Meal.find((food)=> fid===food[0].id  )[0].price
        }
        else{
            reduce =  Drink.find((food)=> fid===food[0].id  )[0].price
        }
        totalnew = totalnew - reduce
        console.log("fid :"+fid);
        
        newCart= newCart.filter((item) => item.id !== fid);

        setCart( newCart);
        setTotal(totalnew);
        
        
    }
   
      
        const values= {MID,MNum,DID,DNum,notes,address,city,state,postalCode,total}
        const checkoutvalues={cart,address,city,state,postalCode,time,total,option,notes,balance,UserName}
        if(userAuthorize)
        {   
            switch(step)
            {
           case 1: return (    <div>
                               <Order 
                               NextStep={NextStep}
                               cart={cart}
                               handleChange={handleChange}
                               AddToCart={AddToCart}
                               RemoveFromCart={RemoveFromCart}
                               values={values}
                               meal={meal}
                               drink={drink}
                               />
                               <Footer/>
                               </div>)
           case 2: return(     <div>
                               <CheckOut 
                               CalculateTotal={CalculateTotal}
                               checkoutvalues={checkoutvalues}
                               option={option}
                               meal ={meal}
                               drink={drink}
                               NextStep={NextStep}
                               PrevStep={PrevStep}
                               handleChange={handleChange}
                               RemoveFromCart={RemoveFromCart}
                               UpdateBalance={UpdateBalance}
                               />
                               <Footer/>
                               </div>)
           case 3: return(
                               <div>
                               <Success
                               checkoutvalues={checkoutvalues}
                              
                               startOver={startOver}
                               />
                               <Footer/>
                               </div>
                           )
           default: return(
                               <div>
                                   <Order 
                                   NextStep={NextStep}
                                   handleChange={handleChange}
                                   AddToCart={AddToCart}
                                   checkoutvalues={checkoutvalues}
                               />
                               <Footer/>
                               </div>
           )
         }

        }
        else
        {
            return(
                <div className="background-boi">
                <h1>You need to be logged in to view this page</h1>
                </div>
           )
        }

    }
    


   
    

