import { useState } from "react";
import { Form, Button, Container, Card, Col, Row } from "react-bootstrap";

const SignUpPage = () => {

    const API_KEY = import.meta.env.VITE_FIREBASE_AUTH_API_KEY;
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();

        if(formData.password!== formData.confirmPassword){
            alert("Passwords do not match!");
            return;
        }
        try{
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY} `,{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body: JSON.stringify({
                    email:formData.email,
                    password: formData.password,
                    returnSecureToken:true,
                })
                
            })
            const data = await response.json();
            if(!response.ok){
                throw new error(data.error.message)
            }else{
                console.log("User Successfully registered")
            }
            
        }catch(err){
            console.error("Failed to post auth details: ",err)
        }
        setFormData({
            email: "",
            password: "",
            confirmPassword: "",
        })
    }

    return (<>
        <Container className="d-flex justify-content-center align-items-center min-vh-100 ">
            <Row className="w-100 justify-content-center">
                <Col xs={10} sm={8} md={5} lg={4}>
                    <Card className=" shadow-sm border w-100">
                        <h3 className="text-center p-3 m-0 bg-dark text-white">Sign Up</h3>
                        <Form className="p-4" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button type="submit" variant="success" className="w-100">
                                Submit
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>)
}

export default SignUpPage;