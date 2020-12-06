import React, {useEffect, useState} from 'react';
import Fire from '../../firebaseConfig';
import Footer from '../Footer/Footer';
import ReactStars from 'react-stars'

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
                <img src={item.url} style={{"width":"200px","height":"200px"}}/>
                <ReactStars
                    count={5}
                    edit={false}
                    onChange={e => console.log(e)}
                    value ={item.rating}
                    size={24}
                    color2={'#ffd700'}
                    color1={'#A9A9A9'} />

                </div>
                })}  
            <Footer/>
            </div>)
}