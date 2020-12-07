import React, {useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext"
import Fire from '../../firebaseConfig';
import ReactStars from 'react-stars'

export default function Review(){
    const [userAuthorize, setAuthorize] = useState(true);
    const { currentUser, logout } = useAuth()
    const [FoodItems, setFoodItems ]= useState([]);
    const [username, setUsername ]= useState([]);

    let database = Fire.db;

    const getUser = async() =>{
        if(currentUser){
            let tempData = [];
            database.getCollection('Users').doc(currentUser.email).get().then(function(doc){
                if(!doc.exists){
                    setAuthorize(false);
                }
                else{
                    setUsername(doc.data().username)
                    let tempOH = doc.data().orderHistory;
                    for(let i = 0; i < tempOH.length; i++){
                        let cart = tempOH[i].cart;
                        for(let j = 0; j < cart.length; j++){
                            if(cart[j].id.includes("m")){
                                database.getCollection('Food').doc(cart[j].id).get().then(function(doc){
                                    tempData.push(doc.data())
                                    if(j == cart.length - 1){
                                        setFoodItems(tempData)
                                    }

                                });
                            }
                            else{
                                database.getCollection('Drink').doc(cart[j].id).get().then(function(doc){
                                    tempData.push(doc.data())
                                    if(j == cart.length - 1){
                                        setFoodItems(tempData)
                                    }
                                });
                            }
                           

                        }
                    }

                }
            })    
        }
    }
    useEffect(() =>{
        getUser()
    },[])
    const setRating = async(event, id) =>{
        database.getCollection('Reviews').doc(id).set({rating: event })
        .then(() =>{
            console.log("Added item to review")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });
    }

    const changeRating = async(event, item, username) =>{
        
        let id = username+item.id;
        let temp_rating = [];
        database.getCollection('Reviews').doc(id).get().then((doc) =>{
           if(doc.exists){
               if(item.id.includes("m")){
                database.getCollection('Food').doc(item.id).get().then((fooddoc) =>{
                    temp_rating = fooddoc.data().rating;
                    let idx = temp_rating.indexOf(doc.data().rating)
                    console.log(idx)
                    temp_rating.splice(idx, 1)
                    temp_rating.push(event);
                    database.getCollection('Food').doc(item.id).update({rating:temp_rating}).then(() =>{
                        setRating(event, id)
                    })
                })
               }
               else{
                database.getCollection('Drink').doc(item.id).get().then((drinkdoc) =>{
                    temp_rating = drinkdoc.data().rating;
                    let idx = temp_rating.indexOf(doc.data().rating)
                    console.log(idx)
                    temp_rating.splice(idx, 1)
                    console.log(temp_rating)
                    temp_rating.push(event);
                    database.getCollection('Drink').doc(item.id).update({rating:temp_rating}).then(() =>{
                        setRating(event, id)
                    })
                })
               }

           }

           else{
            if(item.id.includes("m")){
                database.getCollection('Food').doc(item.id).get().then((fooddoc) =>{
                    temp_rating = fooddoc.data().rating;
                    temp_rating.push(event);
                    database.getCollection('Food').doc(item.id).update({rating:temp_rating}).then(() =>{
                        setRating(event, id)
                    })
                })
               }
               else{
                database.getCollection('Drink').doc(item.id).get().then((drinkdoc) =>{
                    temp_rating = drinkdoc.data().rating;
                    temp_rating.push(event);
                    database.getCollection('Drink').doc(item.id).update({rating:temp_rating}).then(() =>{
                        setRating(event, id)
                    })
                })
               }
           }
        })

    }

    if(userAuthorize == false){
        return(<div>You need to be approved to view this page</div>)
    }


    return(
        <div className='chef-background-boi'>
        {FoodItems.map(function(item, i){
        return <div style={{paddingRight:'2%', border:"1px solid white"}} key={i}>
        {/* <input type="text" value={item.name} onChange={this.handleChange}></input> */}
        <p>{item.name}</p>
        <p>${item.price}</p>
        <p>{item.description}</p>
        <p>{item.id}</p>
        <img src={item.url} style={{"width":"200px","height":"200px"}}/>
        <ReactStars
            count={5}
            edit={true}
            onChange={e=> changeRating(e, item, username)}
            size={24}
            half={false}
            color2={'#ffd700'}
            color1={'#A9A9A9'} />

        <br/>


        </div>
    })} 
    </div>
    )
}