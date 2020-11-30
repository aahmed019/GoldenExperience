import React, { useState } from "react"
import { Container, Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

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
  console.log(currentUser.email)
  return (
        <Container className = "d-flex align-items-center justify-content-center" style ={{minHeight: "50vh"}}>
            <div className ="w-100" style = {{ maxWidth: '400px'}}>
                <Card>
                    <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email}
                    <Link to="/UpdateProfile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout}>
                    Log Out
                    </Button>
                </div>
            </div>
        </Container>
    
  )
}