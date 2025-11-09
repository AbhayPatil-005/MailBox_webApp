import { useState } from "react";
import { Form, Button, Container, Card, Col, Row, Alert, Spinner } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "../../components/Layout/NavBar";

const SignUpPage = () => {

    const API_KEY = import.meta.env.VITE_FIREBASE_AUTH_API_KEY;
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMap = {
            EMAIL_EXISTS: "This email is already registered.",
            INVALID_EMAIL: "Please enter a valid email address.",
            TOO_MANY_ATTEMPTS_TRY_LATER: "You have attempted to many times, please try again later!"
        }
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            setFormData({ ...formData, confirmPassword: "" });
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY} `, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    returnSecureToken: true,
                }),
            })
            const data = await response.json();
            if (!response.ok) {
                setLoading(false);
                throw new Error(data.error.message);
            }
            setSuccess("User Successfully registered");
            setFormData({ email: "", password: "", confirmPassword: "", });
            setTimeout(() => setSuccess(""), 3000);
            navigate("/login")

        } catch (err) {
            const readError = (errorMap[err.message] || "Authentication failed due to some reasons, please try again!")
            setError(readError)
            setTimeout(() => setError(""), 3000);
            console.error("Failed to post auth details: ", err)
        } finally {
            setLoading(false);
        }
    }

    return (<>
        <NavBar />
        <h3 className="text-center m-3">Thank you for signing up! </h3>
        <Container className="d-flex justify-content-center align-items-center ">
            <Row className="w-100 justify-content-center">
                <Col xs={10} sm={8} md={5} lg={4}>
                    <Card className=" shadow-sm border w-100">
                        <h3 className="text-center p-3 m-0 bg-dark text-white rounded-top-2 ">Sign Up</h3>
                        <Form className="p-4" onSubmit={handleSubmit}>

                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    type="email"
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

                            <Button type="submit" variant="success" className="w-100" disabled={loading}>
                                {loading ? <Spinner size="sm" animation="border" /> : "Submit"}
                            </Button>
                        </Form>
                    </Card>
                    <Alert className="mt-3 shadow-sm text-center" variant="primary">Have an account? <NavLink to="/login">login</NavLink></Alert>
                </Col>
            </Row>
        </Container>
    </>)
}

export default SignUpPage;