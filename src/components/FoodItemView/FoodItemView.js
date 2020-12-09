import React, {useEffect, useState} from 'react';
import Fire from '../../firebaseConfig';
import Footer from '../Footer/Footer';
import ReactStars from 'react-stars'
import {Card, Col, Row} from "react-bootstrap";

export default function FoodItemView(){
    const[FoodItems, setFoodItems] = useState([])
    const[recommendedFoodItems, setRecommendedFoodItems] = useState([])
    const[recommendedDrinkItems, setRecommendedDrinkItems] = useState([])

    let database = Fire.db;

    const getRecommendedItems = async() => {
        const rec_food_items = [];
        database.getCollection('Food').orderBy('count', 'desc').limit(3).get().then(
            querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    rec_food_items.push(doc.data())
                });
                setRecommendedFoodItems(rec_food_items)
        });
        const rec_drink_items = [];
        database.getCollection('Drink').orderBy('count', 'desc').limit(3).get().then(
            querySnapshot => {
                
                querySnapshot.docs.forEach(doc => {
                    rec_drink_items.push(doc.data())
                });
                setRecommendedDrinkItems(rec_drink_items)
        });

    }

    const getData = async() =>{
        const foodItems = []
        database.getCollection('Food').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                foodItems.push(doc.data())
            });
            database.getCollection('Drink').get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    foodItems.push(doc.data())
                });
            
            setFoodItems(foodItems)
            getRecommendedItems()
            // this.setState({show: false});
        }).catch(function(error){
            console.log(error)
        })
            // setFoodItems(foodItems)
            // this.setState({show: false});
        }).catch(function(error){
            console.log(error)
        })
    }
    useEffect(() =>{
        getData()
    },[])

    const calculateRating = (rating) =>{
        let ratingVal = 0.0;
        if(rating.length == 0){
            return 0;
        }
        let sum = 0;
        for(let i = 0; i < rating.length; i++){
            sum += rating[i];
        } 
        ratingVal = sum/rating.length;
        return ratingVal;
    }   

    return(<div className='chef-background-boi'>
        <h2>Recommended Food Items for you:</h2>
        <Row>
                {recommendedFoodItems.map(function(item, i){
                if(item.vip){
                    return <Card style={{ width: '18rem', height:"100%", marginLeft: "2%", marginTop:"2%" }}>
                    <Card.Img style={{height:"50%"}} variant="top" src={item.url} />
                    <Card.Body>
                        <Card.Title>{item.name} for ${item.price} **VIP ONLY</Card.Title>
                        <Card.Text>
                        {item.description}
                        </Card.Text>
                        <ReactStars
                    count={5}
                    edit={false}
                    onChange={e => console.log(e)}
                    value ={calculateRating(item.rating)}
                    size={24}
                    color2={'#ffd700'}
                    color1={'#A9A9A9'} />
                    </Card.Body>
                    </Card>
                }
                else{
                    return  <Card style={{ width: '18rem',  height:"100%", marginLeft: "2%", marginTop:"2%"}}>
                    <Card.Img style={{height:"50%"}}variant="top" src={item.url} />
                    <Card.Body>
                        <Card.Title>{item.name} for ${item.price}</Card.Title>
                        <Card.Text>
                        {item.description}
                        </Card.Text>
                        <ReactStars
                    count={5}
                    edit={false}
                    onChange={e => console.log(e)}
                    value ={calculateRating(item.rating)}
                    size={24}
                    color2={'#ffd700'}
                    color1={'#A9A9A9'} />
                    </Card.Body>
                    </Card>
                }
                
                })} 
            </Row> 
                <h2>Recommended Drink Items for you:</h2>
                <Row>
                {recommendedDrinkItems.map(function(item, i){
                if(item.vip){
                    return <Card style={{ width: '18rem',height:"100%",  marginLeft: "2%", marginTop:"2%" }}>
                    <Card.Img variant="top" src={item.url} />
                    <Card.Body>
                        <Card.Title>{item.name} for ${item.price} **VIP ONLY</Card.Title>
                        <Card.Text>
                        {item.description}
                        </Card.Text>
                        <ReactStars
                    count={5}
                    edit={false}
                    onChange={e => console.log(e)}
                    value ={calculateRating(item.rating)}
                    size={24}
                    color2={'#ffd700'}
                    color1={'#A9A9A9'} />
                    </Card.Body>
                    </Card>
                }
                else{
                    return  <Card style={{ width: '18rem', marginLeft: "2%", marginTop:"2%"}}>
                    <Card.Img style={{height:"50%"}}variant="top" src={item.url} />
                    <Card.Body>
                        <Card.Title>{item.name} for ${item.price}</Card.Title>
                        <Card.Text>
                        {item.description}
                        </Card.Text>
                        <ReactStars
                    count={5}
                    edit={false}
                    onChange={e => console.log(e)}
                    value ={calculateRating(item.rating)}
                    size={24}
                    color2={'#ffd700'}
                    color1={'#A9A9A9'} />
                    </Card.Body>
                    </Card>
                }
                
                })} 
                </Row> 
                <br/>

                <h2>All items:</h2>
        <Row>
                {FoodItems.map(function(item, i){
                if(item.vip){
                    return <Card style={{ width: '18rem', marginLeft: "2%", marginTop:"2%" }}>
                    <Card.Img style={{height:"50%"}} variant="top" src={item.url} />
                    <Card.Body>
                        <Card.Title>{item.name} for ${item.price} **VIP ONLY</Card.Title>
                        <Card.Text>
                        {item.description}
                        </Card.Text>
                        <ReactStars
                    count={5}
                    edit={false}
                    onChange={e => console.log(e)}
                    value ={calculateRating(item.rating)}
                    size={24}
                    color2={'#ffd700'}
                    color1={'#A9A9A9'} />
                    </Card.Body>
                    </Card>
                }
                else{
                    return  <Card style={{ width: '18rem', marginLeft: "2%", marginTop:"2%"}}>
                    <Card.Img style={{height:"50%"}}variant="top" src={item.url} />
                    <Card.Body>
                        <Card.Title>{item.name} for ${item.price}</Card.Title>
                        <Card.Text>
                        {item.description}
                        </Card.Text>
                        <ReactStars
                    count={5}
                    edit={false}
                    onChange={e => console.log(e)}
                    value ={calculateRating(item.rating)}
                    size={24}
                    color2={'#ffd700'}
                    color1={'#A9A9A9'} />
                    </Card.Body>
                    </Card>
                }
                
                })} 
                </Row> 
            <Footer/>
            </div>)
}