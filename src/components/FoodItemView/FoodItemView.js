import React, {useEffect, useState} from 'react';
import Fire from '../../firebaseConfig';
import Footer from '../Footer/Footer';

export default function FoodItemView(){
    const[FoodItems, setFoodItems] = useState([])
    let database = Fire.db;
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


    return(<div className='chef-background-boi'>
                {FoodItems.map(function(item, i){
                return <div style={{paddingRight:'2%', border:"1px solid white"}} key={i}>
                {/* <input type="text" value={item.name} onChange={this.handleChange}></input> */}
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{item.description}</p>
                </div>
                })}  
            <Footer/>
            </div>)
}