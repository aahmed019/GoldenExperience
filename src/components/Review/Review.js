import React, {useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext"
import Fire from '../../firebaseConfig';
import ReactStars from 'react-stars'
import Notifications, {notify} from 'react-notify-toast';
import {Card, Row, Col} from "react-bootstrap"
export default function Review(){
    const [userAuthorize, setAuthorize] = useState(true);
    const { currentUser, logout } = useAuth()
    const [FoodItems, setFoodItems ]= useState([]);
    const [username, setUsername ]= useState([]);

    let database = Fire.db;

    const getUser = async() =>{
        if(currentUser){
            let tempData = [];
            let hash = {};
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
                            if(cart[j].id[0] == ("m") && !hash[cart[j].id]){
                                hash[cart[j].id] = true;
                                database.getCollection('Food').doc(cart[j].id).get().then(function(doc){
                                    tempData.push(doc.data())
                                    if(j == cart.length - 1){
                                        setFoodItems(tempData)
                                    }

                                });
                            }
                            else{
                                if(!hash[cart[j].id]){
                                    hash[cart[j].id] = true;
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
            notify.show('Thank you for your review!');

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
               if(item.id[0] == ("m")){
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
            if(item.id[0] == ("m")){
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

    if(userAuthorize == false  && currentUser.email != "manageremail@gmail.com"){
        return(<div>You need to be approved to view this page</div>)
    }
    if(FoodItems.length == 0){
        return<div>Please buy food in order to review items</div>
    }


    return(
        <div className='chef-background-boi'>
        <Row>
        {FoodItems.map(function(item, i){
        return <Card style={{ width: '18rem',  height:"100%", marginLeft: "2%", marginTop:"2%"}}>
        <Card.Img style={{height:"50%"}}variant="top" src={item.url} />
        <Card.Body>
            <Card.Title>{item.name} for ${item.price}</Card.Title>
            <Card.Text>
            {item.description}
            </Card.Text>
            <ReactStars
            count={5}
            edit={true}
            onChange={e=> changeRating(e, item, username)}
            size={24}
            color2={'#ffd700'}
            color1={'#A9A9A9'} />
        </Card.Body>
        </Card>
      
    })} 
  </Row>
    <Notifications/>

    </div>
    )
}