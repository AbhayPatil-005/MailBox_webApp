import { ListGroup, Button,Badge } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";



const SideBar=({unreadCount})=>{
    const {pathname} = useLocation();
    return(
    <div className="p-3">
        <Button as={Link} to="/home/compose" 
        className="btn btn-primary w-100 mb-3">
            Compose +
        </Button>

        <ListGroup variant="flush">
        <ListGroup.Item 
            as={Link} 
            to="/home/inbox" 
            active={pathname.includes("inbox")}
            variant="secondary"
            action
            className="d-flex justify-content-between align-items-center"
            >Inbox{unreadCount > 0 && (
            <Badge bg="white" text='dark' pill>
              {unreadCount}
            </Badge>
          )}</ListGroup.Item>
        <ListGroup.Item 
          as={Link} to="/home/sent" 
          active={pathname.includes("sent")} 
          variant="secondary"
          action
          >Sent</ListGroup.Item>
      </ListGroup>
    </div>)
}

export default SideBar;