import React, {useRef, useState}from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Container } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom'
import Fire from '../../firebaseConfig';

export default function SignUp(){
        const emailRef = useRef();
        const userRef = useRef();
        const nameRef = useRef();
        const passwordRef = useRef();
        const passwordConfirmRef = useRef();
        const {signup} = useAuth();
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);
        const history = useHistory();
        let db = Fire.db;

        async function handleSubmit(e){
            e.preventDefault()

            if(passwordRef.current.value !== passwordConfirmRef.current.value){
                return setError('passwords do not match')
            }

            try {
                setError('')
                setLoading(true)
                await signup(emailRef.current.value, passwordRef.current.value)
                db.getCollection('SignUp').doc(emailRef.current.value).set({
                    username: userRef.current.value,
                    password: passwordRef.current.value,
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    orderHistory: [],
                    warnings: 0,
                    Balance: 0,
                    Vip: false
                    }).then(function() {// went through
                        console.log("Document successfully written!");
                        
                    })
                    .catch(function(error) { //broke down somewhere
                        console.error("Error writing document: ", error);
                    });

                history.push('/Confirmation')
            } catch{
                setError('Failed to create account')
            }
            setLoading(false)
        }
    return(
        <Container className = "d-flex align-items-center justify-content-center" style ={{minHeight: "100vh"}}>
          <div className ="w-100" style = {{ maxWidth: '400px'}}>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Sign Up</h2>
                        {error && <Alert variant ="danger">{error}</Alert>}
                    <Form onSubmit ={handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref={emailRef} required/>                 
                        </Form.Group>
                        <Form.Group id = "user">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type = "text" ref={userRef} required/>                 
                        </Form.Group>
                        <Form.Group id = "Name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type = "text" ref={nameRef} required/>                 
                        </Form.Group>
                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type = "password" ref={passwordRef} required/>                 
                        </Form.Group>
                        <Form.Group id = "password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type = "password" ref={passwordConfirmRef} required/>                 
                        </Form.Group>
                        {/* <Form.Group id = "name-confirm">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type = "text" ref={nameRef} required/>                 
                        </Form.Group> */}
                        <Button className = "w-100" type = "submit" disabled={loading}>
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? Go back to <Link to ="./LoginV2">Login</Link>
            </div>
            </div>
        </Container>
        
    );
}