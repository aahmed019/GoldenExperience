import React, {useEffect, useState } from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import Fire from '../../firebaseConfig';
import 'react-tabs/style/react-tabs.css';


export default function FoodItems() {
    let tests = Fire.db

    const[FoodItems, setFoodItems] = useState([])
    const[foodNameValue, setFoodName] = useState([])
    const[foodPriceValue, setFoodPrice] = useState([])
    const[foodDescriptionValue, setFoodDescription] = useState([])
    const[typeValue, setFoodType] = useState([])

    const[show, setShow] = useState([])
    const username = "John";
    // const[newWord, setNewWord] = useState('')
    
    const getData = async() =>{
        const foodItems = []
        tests.getCollection('Food').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                if(doc.data()["Chef"] === username){
                    foodItems.push(doc.data())
                }
            });
            tests.getCollection('Drink').get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    if(doc.data()["Chef"] === username){
                        foodItems.push(doc.data())
                    }
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
        setShow(false)
        getData()
    },[])



    // async function deleteWord(word){
    //     await tests.getCollection('TabooWords').doc(word).delete()
    //     .then(() =>{
    //         console.log("User deleted from Database")
    //     })
    //     .catch(function(error) { //broke down somewhere
    //         console.error("Error: ", error);
    //     });

    //     getData()
    // }

    // async function addWord(){
    //     await tests.getCollection('TabooWords').doc(newWord).set({word: newWord})
    //     .then(() =>{
    //         console.log("Added word to taboo list")
    //     })
    //     .catch(function(error) { //broke down somewhere
    //         console.error("Error: ", error);
    //     });

    //     getData()
    // }

    async function deleteFoodItem(fooditem){
        await tests.getCollection('Food').doc(fooditem.id).delete()
        .then(() =>{
            console.log("Food item from Database")
        })
        .catch(function(error) { //broke down somewhere
            console.error("Error: ", error);
        });

        getData()
    }
    async function addFooditem(){
        if(typeValue === "drink"){
            let id="d"+foodNameValue.split(" ").join("")
            await tests.getCollection('Drink').doc(id).set({name: foodNameValue, price: foodPriceValue, description: foodDescriptionValue, id: id, Chef: username  })
            .then(() =>{
                console.log("Added item to drink")
            })
            .catch(function(error) { //broke down somewhere
                console.error("Error: ", error);
            });
            
        }
        else{
            let id="m"+foodNameValue.split(" ").join("")
            await tests.getCollection('Food').doc(id).set({name: foodNameValue, price: foodPriceValue, description: foodDescriptionValue, id: id, Chef: username  })
                    .then(() =>{
                        console.log("Added item to food")
                    })
                    .catch(function(error) { //broke down somewhere
                        console.error("Error: ", error);
                    });
        }
        setFoodPrice("")
        setFoodDescription("")
        setFoodType("Food")
        setFoodPrice()
        setShow(false)

        getData()
    }


    const handleClose= (e) =>{
        setShow(false)
    }
    //const handleSubmit= (e) =>{
        //setShow(false)
    //}




    return (     
        <div className='chef-background-boi'>
             {FoodItems.map(function(item, i){
                return <div style={{paddingRight:'2%', border:"1px solid white"}} key={i}>
                {/* <input type="text" value={item.name} onChange={this.handleChange}></input> */}
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{item.description}</p>
                <button onClick={() => {deleteFoodItem(item)}}>Delete</button>
                </div>
            })} 
            <br/>
            <br/>

            <button onClick={() => {setShow(true)}}>Add Food Item</button>
            <br/>
            <br/>
 
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                    <Modal.Title>Food</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={addFooditem}>
                                <div>
                                    <h6>Item Name:</h6>
                                    <input type="text" className="post-modal-input" onChange={e => setFoodName(e.target.value)} value={foodNameValue}/>
                                    <h6>Price:</h6>
                                    <input type="number" className="post-modal-input" onChange={e => setFoodPrice(e.target.value)} value={foodPriceValue}/>
                                    <h6>Description:</h6>
                                    <input type="text" className="post-modal-input" onChange={e => setFoodDescription(e.target.value)} value={foodDescriptionValue}/>
                                    <h6>Type:</h6>
                                    <select value={typeValue} onChange={e => setFoodType(e.target.value)}>
                                        <option value="food">Food</option>
                                        <option value="drink">Drink</option>
                                        {/* <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option> */}
                                        </select>

                            </div>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary post-modal-button" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary post-modal-button" onClick={addFooditem}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
        </Modal>
            
        </div>

        );

    
}