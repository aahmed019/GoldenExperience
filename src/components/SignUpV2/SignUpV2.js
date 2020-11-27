import React, {useRef, useState}from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

export default function SignUp(){
        const emailRef = useRef();
        const nameRef = useRef();
        const passwordRef = useRef();
        const passwordConfirmRef = useRef();
        const {signup, currentUser} = useAuth();
        const [error, setError] = useState('');
        const [loading, setLoading] = useState(false);
        
        
        async function handleSubmit(e){
            e.preventDefault()

            if(passwordRef.current.value !== passwordConfirmRef.current.value){
                return setError('passwords do not match')
            }

            try {
                setError('')
                setLoading(true)
                await signup(emailRef.current.value, passwordRef.current.value)
            } catch{
                setError('Failed to create account')
            }
            setLoading(false)
        }
    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Sign Up</h2>
                    {currentUser&& currentUser.email}
                        {error && <Alert variant ="danger">{error}</Alert>}
                    <Form onSubmit ={handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref={emailRef} required/>                 
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
                Already have an account? Go back to Login
            </div>
        </>
    )
}