import React, { useState } from "react"
import { Container, Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Fire from '../../firebaseConfig';
import './ProfilePage.css'

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  let database = Fire.db
  const [userName, setUsername] = useState("");
  const [name, setName] = useState("");
  const [Balance, setBalance] = useState("");
  const [warnings, setWarnings] = useState("");
  const [vip, setVipstatus] = useState("");
  const [email, setEmail] = useState("");

  
  database.getCollection('Users').doc(currentUser.email).get().then(function(doc){
    if(doc.exists){
      setEmail(doc.data().email)
      setUsername(doc.data().username);
      setName(doc.data().name);
      setBalance(doc.data().Balance);
      setWarnings(doc.data().warnings);
      setVipstatus(doc.data().Vip)
    }
    else{
      console.log('no doc found')
    }
  })
  
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/LoginV2")
    } catch {
      setError("Failed to log out")
    }
  }
  /* NOTE: To find the route for profile user must login into their account first. 
  The path to get here and Code is located in PrivateRoutes/PrivateRoutes.js  */
  return (
        <Container className = "d-flex align-items-center justify-content-center" style ={{minHeight: "50vh"}}>
            <div className ="w-100" style = {{ maxWidth: '400px'}}>
                <Card>
                    <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {email !== '' ?
                    <div>
                    <strong>Email:</strong> {email}<br/>
                    <strong>Username:</strong> {userName}<br/>
                    <strong>name:</strong> {name}<br/>
                    <strong>Balance:</strong> {Balance}<br/>
                    <strong>Warnings:</strong> {warnings}<br/>
                    <strong>Vip Status:</strong> {vip}
                    </div>:
                    <div>
                    <strong>Account Still Pending!</strong><br/>
                    </div>
                    }
                    {email !== '' ?
                    <Link to="/UpdateProfile" className="btn btn-primary w-100 mt-3">
                        Update email/password
                    </Link>:
                    <Link to="/Home" className="btn btn-primary w-100 mt-3">
                    Home
                    </Link>}
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout} className="font-text">
                    Log Out
                    </Button>
                </div>
            </div>
        </Container>
    
  )
}