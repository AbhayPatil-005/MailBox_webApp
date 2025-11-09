import { Container, Row, Col, Form, Button, Spinner, Card, Alert } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate, NavLink } from "react-router-dom";
import NavBar from "../../components/Layout/NavBar";

const LoginPage = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const errorMap = {
        INVALID_LOGIN_CREDENTIALS: "The user has either entered wrong email or password",
        EMAIL_NOT_FOUND: "Email not registered.",
        INVALID_PASSWORD: "Wrong password. Try again.",
        USER_DISABLED: "This account has been disabled.",
    }


    const dispatch = useDispatch();
    const API_KEY = import.meta.env.VITE_FIREBASE_AUTH_API_KEY
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const handleEvent = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    returnSecureToken: true,
                }),
            })
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error.message || "Authentication failed")
            }
            dispatch(login({ token: data.idToken, userId: data.localId, userEmail: data.email }));
            setSuccess("Login Successful");
            setFormData({ email: "", password: "" });
            setTimeout(() => setSuccess(""), 3000)

            navigate("/home");

        } catch (err) {
            const readError = (errorMap[err.message] || "Failed to login, please try again after sometime")
            setError(readError);
            setTimeout(() => setError(""), 3000);
            console.log(err.message);
        } finally {
            setLoading(false)
        }
    }
    return (<>
            <NavBar />
            <h3 className="text-center m-3">Welcome to Mail-Box, please Login! </h3>
            <Container className="d-flex justify-content-center align-items-center mt-3 ">

                <Row className="w-100 justify-content-center">
                    <Col xs={10} sm={8} md={5} lg={4}>
                        <Card className="shadow-sm border">
                            <h3 className="text-center p-3 m-0 bg-dark text-white rounded-top-2 ">Login</h3>
                            <Form className="p-4" onSubmit={handleEvent}>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {success && <Alert variant="success">{success}</Alert>}
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        placeholder="Enter your email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        name="password"
                                        placeholder="Enter your password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="success" className="w-100" type="submit" disabled={loading}>
                                    {loading ? <Spinner size="sm" animation="border" /> : "Login"}
                                </Button>
                            </Form>
                        </Card>
                        <Alert className="mt-3 shadow-sm" variant="primary">Don't have an account? <NavLink to="/signup">sign up here</NavLink></Alert>
                    </Col>
                </Row>
            </Container>
    </>)
}

export default LoginPage;