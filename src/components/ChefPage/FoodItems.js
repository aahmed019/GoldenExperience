import React, {useEffect, useState } from 'react';
import {Button, Modal, Form, Card, Col, Row} from "react-bootstrap";
import Fire from '../../firebaseConfig';
import 'react-tabs/style/react-tabs.css';
import { useAuth } from "../../contexts/AuthContext"


export default function FoodItems() {
    let tests = Fire.db

    const[FoodItems, setFoodItems] = useState([])
    const[foodNameValue, setFoodName] = useState([])
    const[foodPriceValue, setFoodPrice] = useState([])
    const[foodDescriptionValue, setFoodDescription] = useState([])
    const[typeValue, setFoodType] = useState([])
    const[url, setURL] = useState([])
    const[vip, setVIP] = useState(false)
    const { currentUser, logout } = useAuth()

    const[show, setShow] = useState([])
    // const username = "John";
    const[username, setUsername] = useState('')
    const[userAuthorize, setAuthorize] = useState(true)
    const[email, setEmail] = useState('')

    const getData = async() =>{
        const foodItems = []
        tests.getCollection('Food').get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                if(doc.data().Chef == username){
                    foodItems.push(doc.data())

                }
            });
            tests.getCollection('Drink').get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    if(doc.data().Chef == username){
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
    const getUser = async() =>{
        if(currentUser){
            // if(currentUser.email == "johndoe321sb@gmail.com"){
            //     tests.getCollection('Staff').doc("JohnDoe321sb@gmail.com").get().then(function(doc){
            //         if(!doc.exists || doc.data().Position != "Chef"){
            //             setAuthorize(false);
            //         }
            //         else{
            //             setUsername(doc.data().Name)
            //             setEmail("JohnDoe321sb@gmail.com")
            //         }
            //     })    
            // }
            // else{
                tests.getCollection('Staff').doc(currentUser.email).get().then(function(doc){
                    if(!doc.exists || doc.data().Position != "Chef"){
                        setAuthorize(false);
                    }
                    else{
                        setUsername(doc.data().Name)
                        setEmail(doc.data().email)
                    }
                })    
            // }
         
        }
    }

    useEffect(() =>{
        setShow(false)
        getUser()
    },[])
    useEffect(() =>{
        getData()
    },[username])

    async function deleteFoodItem(fooditem){
        if(fooditem.id.includes("d")){
            await tests.getCollection('Drink').doc(fooditem.id).delete()
            .then(() =>{
                console.log("Removed drink item from Database")
                getData()

            })
            .catch(function(error) { //broke down somewhere
                console.error("Error: ", error);
            });
    
        }
        else{
            await tests.getCollection('Food').doc(fooditem.id).delete()
            .then(() =>{
                console.log("Removed food item from Database")
                getData()

            })
            .catch(function(error) { //broke down somewhere
                console.error("Error: ", error);
            });

        }
       
    }
    async function addFooditem(){
        if(typeValue === "drink"){
            let id="d"+foodNameValue.split(" ").join("")
            await tests.getCollection('Drink').doc(id).set({name: foodNameValue, price: foodPriceValue, description: foodDescriptionValue, id: id, Chef: username, url: url, rating:[], count:0, vip:vip, email:email })
            .then(() =>{
                console.log("Added item to drink")
            })
            .catch(function(error) { //broke down somewhere
                console.error("Error: ", error);
            });
            
        }
        else{
            let id="m"+foodNameValue.split(" ").join("")
            await tests.getCollection('Food').doc(id).set({name: foodNameValue, price: foodPriceValue, description: foodDescriptionValue, id: id, Chef: username, url: url, rating:[], count:0, vip:vip, email:email  })
                    .then(() =>{
                        console.log("Added item to food")
                    })
                    .catch(function(error) { //broke down somewhere
                        console.error("Error: ", error);
                    });
        }
        setFoodPrice("")
        setFoodDescription("")
        setFoodName("")
        setURL("")
        setFoodType("Food")
        setFoodPrice()
        setShow(false)
        setVIP(false)

        getData()
    }


    const handleClose= (e) =>{
        setShow(false)
    }

    if(userAuthorize == false || !currentUser){
        return(<div>You need to be approved to view this page</div>)
    }


    return (     
        <div className='chef-background-boi'>
            <Row>
             {FoodItems.map(function(item, i){
                 if(item.vip){
                    return <Col> <Card style={{ width: '18rem',  height:"100%", marginLeft: "2%", marginTop:"2%"}}>
                    <Card.Img style={{height:"50%"}}variant="top" src={item.url} />
                    <Card.Body>
                        <Card.Title>{item.name} for ${item.price} FOR VIP ONLY</Card.Title>
                        <Card.Text>
                        {item.description}
                        <br/>
                        ID: {item.id}
                        </Card.Text>
                        <Button onClick={() => {deleteFoodItem(item)}}>Delete</Button>
                    </Card.Body>
                    </Card>
                    </Col>
                 }
                 else{
                    return <Col><Card style={{ width: '18rem',  height:"100%", marginLeft: "2%", marginTop:"2%"}}>
                    <Card.Img style={{height:"50%"}}variant="top" src={item.url} />
                    <Card.Body>
                        <Card.Title>{item.name} for ${item.price}</Card.Title>
                        <Card.Text>
                        {item.description}
                        <br/>
                        ID: {item.id}
                        </Card.Text>
                        <Button onClick={() => {deleteFoodItem(item)}}>Delete</Button>
                    </Card.Body>
                    </Card>
                    </Col>
                    
                    // <div style={{paddingRight:'2%', border:"1px solid white"}} key={i}>
                    // {/* <input type="text" value={item.name} onChange={this.handleChange}></input> */}
                    // <p>{item.name}</p>
                    // <p>${item.price}</p>
                    // <p>{item.description}</p>
                    // <p>{item.id}</p>
                    // {/* {item.vip} ? <p>For VIP</p> */}
    
                    // <img src={item.url} style={{"width":"200px","height":"200px"}}/>
                    // <br/>
                    // <button onClick={() => {deleteFoodItem(item)}}>Delete</button>
    
    
                    // </div>
                 }
               
            })} 
            </Row>
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
                                    </select>
                                    <h6>Url:</h6>
                                    <input type="text" className="post-modal-input" onChange={e => setURL(e.target.value)} value={url}/>
                                    <h6>Only for VIP:</h6>
                                    <input type="checkbox" style={{marginLeft:"-45%"}} className="post-modal-input" onChange={e => setVIP(e.target.checked)}/>




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