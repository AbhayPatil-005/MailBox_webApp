import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";



const SideBar=()=>{
    return(
    <div className="p-3">
        <Button as={Link} to="/home/compose" 
        className="btn btn-primary w-100 mb-3">
            Compose 
        </Button>

        <ListGroup>
        <ListGroup.Item as={Link} to="/home/inbox" action>Inbox</ListGroup.Item>
        <ListGroup.Item as={Link} to="/home/sent" action>Sent</ListGroup.Item>
      </ListGroup>
    </div>)
}

export default SideBar;