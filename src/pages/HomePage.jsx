import ComposeMail from "../components/Features/ComposeMail";
import InboxView from "../components/Features/InboxView";
import SideBar from "../components/Layout/SideBar";
import NavBar from "../components/Layout/NavBar";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const HomePage = () => {
    return (<>
        <Container fluid className="p-0 d-flex flex-column" style={{ height: "100vh", overflow: "hidden" }}>
            <NavBar />
            <div className="d-flex flex-grow-1">

                <Col md={2} className="border-end bg-light">
                    <SideBar />
                </Col>

                <Col md={10} className="p-0 d-flex flex-column">
                    <div className="flex-grow-1 overflow-auto p-4">
                        <Outlet />
                    </div>
                </Col>
            </div>
        </Container>
    </>)
}

export default HomePage;