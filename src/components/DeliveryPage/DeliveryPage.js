import React,{useEffect,useState} from 'react'
import { useAuth } from '../../contexts/AuthContext';
import {Row,Col,Button, Container} from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Fire from '../../firebaseConfig'

export default function DeliveryPage(props){

<<<<<<< HEAD
    const db =Fire.db;

    const{ currentUser}=useAuth()
    const[orders,setOrder] = useState([])
    const[staffName,setStaffName]=useState("")
    const [cart,setCart]= useState([])
=======
    const db = Fire.db;
>>>>>>> 13ac9467a29de13428b27af5ceb8d74d04072f7b

    useEffect(()=>{
        getData()

    },[])

<<<<<<< HEAD
    const getData=()=>{
             db.getCollection("Staff").doc(currentUser.email).get().then(doc => {

            if(doc.exists){
                const data = doc.data();
                setStaffName(data.Name)
            }
            else
            {
                alert("No information available")
            }
        }).then(()=>{
            let order = [];
             db.getCollection("Orders").where('type','==','delivery').get().then(snapshot => {
               
                snapshot.forEach(doc => {
                    const data = doc.data();
                    order.push([data, doc.id]);
    
                })
                //alert(JSON.stringify(order))
                order =order.filter(item=> item[0].deliverer === "")
                setOrder(order)
        })}).catch(error=> console.log("Error: ",error))
    }

    const showorda = orders.filter(item=> item[0].deliverer ==="")
    return(
    <div className="background-boi">
    <h1>Delivery Page</h1>
    
     {showorda && showorda.map((data,i) => {
        return( <Row className="DRows" >
                <Col xs="auto" >
                <Card
                    bg='Dark'
                    key={i}
                    style={{ width: '100%' }}
                     className="mb-2"
                 >
                    <Card.Header>Order : {data[1]}</Card.Header>
                    
                    <Card.Body>
                        <p>Name:  {data[0].userName}</p>
                        <p>Address: {data[0].address}</p>
                        <p>Items</p>
                        <ol>
                        {data[0].items.map(item=>{return(<li> {item.id}  x  {item.quantity}</li>)})}
                        </ol>
                        <p>Total: {data[0].total}</p>
                    </Card.Body>
                </Card>
                </Col>
                <Col xs="auto"  style={{  
                                display:'flex', 
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'center'}}>
                <Button variant="primary" >Bid</Button>
                </Col>
                
                </Row>
              )})}

    
    </div>)
=======
    return(
        <div>
            HELLO
        </div>
    )
>>>>>>> 13ac9467a29de13428b27af5ceb8d74d04072f7b
}