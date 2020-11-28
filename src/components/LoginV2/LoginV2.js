import React, {useRef, useState}from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Container } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom'
import './Login.css';
import Footer from '../Footer/Footer';
export default function Login(){
        const emailRef = useRef();
        const passwordRef = useRef();
        const {login} = useAuth();
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);
        const history = useHistory();
        
        
        async function handleSubmit(e){
            e.preventDefault()

            try {
                setError('')
                setLoading(true)
                await login(emailRef.current.value, passwordRef.current.value)
                history.push('/Home')
            } catch{
                setError('Failed to sign in. Please try again!')
            }
            setLoading(false)
        }
    return(
        <div className = "background-boi">
        <Container className = "d-flex align-items-center justify-content-center " style ={{minHeight: "80vh"}}>
            <div className ="w-100 " style = {{ maxWidth: '400px'}}>
                <Card classname = "card-color">
                    <Card.Body className = "card-color"> 
                        <h2 className = "text-center mb-4 navItems">Log In</h2>
                            {error && <Alert variant ="danger">{error}</Alert>}
                        <Form onSubmit ={handleSubmit}>
                            <Form.Group id = "email ">
                                <Form.Label className= "navItems"><strong>Email</strong></Form.Label>
                                <Form.Control type = "email" ref={emailRef} required/>                 
                            </Form.Group>
                            <Form.Group id = "password">
                                <Form.Label className= "navItems"><strong>Password</strong></Form.Label>
                                <Form.Control type = "password" ref={passwordRef} required/>                 
                            </Form.Group>
                            {/* <Form.Group id = "name-confirm">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type = "text" ref={nameRef} required/>                 
                            </Form.Group> */}
                            
                                <Button className = "w-100 sign-in btn-outline-dark" type = "submit" disabled={loading}>
                                    <strong>Log in</strong>
                                </Button>
                            
                        </Form>
                        <div className = "w-100 text-center mt-3 navItems">
                            <Link className ="navItems" to ='/forgot-password'>
                            Forgot Password?
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <strong>Need an Account?</strong> <Link className = "navItems"to ="/SignUpV2"><strong>Click Here!</strong></Link>
                </div>
            </div>
        </Container>
        <Footer/>
        </div>

    );
}