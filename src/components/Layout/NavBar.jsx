import { Navbar, Container, Button } from "react-bootstrap";
import { logout } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";


const NavBar = () => {
    const dispatch = useDispatch();
    const userEmail =  useSelector((state)=>state.auth.userEmailId);
    const logoutHandler=()=>{
        dispatch(logout())
    }
    return (<>
        <Navbar bg="light" className="px-3 border">
            <Container fluid>
                <Navbar.Brand className="fw-bold fs-5">Mail-Box</Navbar.Brand>

                <div className="ms-auto d-flex align-items-center gap-3">
                    <span className="text-muted small">{userEmail}</span>
                    <Button variant="outline-danger" size="sm" onClick={logoutHandler}>
                        Logout
                    </Button>
                </div>
            </Container>
        </Navbar>
    </>)
}

export default NavBar;