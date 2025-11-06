import SideBar from "../components/Layout/SideBar";
import NavBar from "../components/Layout/NavBar";
import { Container, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const HomePage = () => {
    const [unreadCount, setUnreadCount] = useState(0);
    return (<>
        <Container fluid className="p-0 d-flex flex-column" style={{ height: "100vh", overflow: "hidden" }}>
            <NavBar />
            <div className="d-flex flex-grow-1">

                <Col md={2} className="border-end bg-light">
                    <SideBar unreadCount={unreadCount}/>
                </Col>

                <Col md={10} className="p-0 d-flex flex-column">
                    <div className="flex-grow-1 overflow-auto p-4">
                        <Outlet context={{setUnreadCount}} />
                    </div>
                </Col>
            </div>
        </Container>
    </>)
}

export default HomePage;