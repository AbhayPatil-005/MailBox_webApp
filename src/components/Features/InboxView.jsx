import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toast, ToastContainer, ListGroup, Spinner, Button } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";

const InboxView = () => {
    const BASE_URL = import.meta.env.VITE_FIREBASE_BASE_URL;
    const email = useSelector((state) => state.auth.userEmailId);
    const safeEmail = email.replace(/\./g, ",");

    const navigate = useNavigate();
    const { setUnreadCount } = useOutletContext();

    const [mails, setMails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
        show: false, variant: "", message: "", textColor: ""
    })

    const fetchInbox = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/mails/${safeEmail}/inbox.json`);
            const data = await res.json();

            if (data) {
                const formatted = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                }));
                setMails(formatted.reverse());
                const unread = formatted.filter(mail => !mail.read).length;
                setUnreadCount(unread);
            }
        } catch (error) {
            setToast({
                show: true, message: "Failed to load the mails", variant: "danger", textColor: "text-white"
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (mailId) => {
        try {const res = await fetch(`${BASE_URL}/mails/${safeEmail}/inbox/${mailId}.json`,{
            method:"DELETE",
        });
        setMails((prev)=>prev.filter((mail)=>mail.id!==mailId));
        setToast({show:true, message:"Mail deleted successfully", variant:"success", textColor:"text-white"});
        } catch (error) {
            setToast({show:true, message:"Failed to delete Mail, check internet connection!", variant:"danger", textColor:"text-white"});
            console.log(error.message)
        };
    };

    useEffect(() => {
        fetchInbox();
    }, []);

    if (loading)
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Spinner animation="border" variant="primary" />
            </div>);
            
    return (<>
        <ToastContainer position="top-end" className="mt-3">
            <Toast
                bg={toast.variant}
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
                delay={3000} autohide
            >
                <Toast.Body className={toast.textColor}>{toast.message}</Toast.Body>
            </Toast>
        </ToastContainer>
        <div className="d-flex flex-column">
            <h4 className="mb-3">Inbox</h4>

            <div className="flex-grow-1 border rounded p-2 bg-white">
                {mails.length === 0 && <p>No emails yet 📭</p>}

                <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                    <ListGroup>
                        {mails.map((mail) => (
                            <ListGroup.Item
                                key={mail.id}
                                className="d-flex justify-content-between align-items-center"
                                onClick={() => navigate(`/home/mail/${mail.id}`)}
                            >
                                <div style={{ cursor: "pointer" }}>
                                    {!mail.read && (
                                        <span className="me-2 text-primary fw-bold">💠</span>
                                    )}
                                    <strong>{mail.from}</strong> — {mail.subject}
                                </div>

                                <small className="ms-auto">
                                    {mail.date ? new Date(mail.date).toLocaleDateString() : ""}
                                </small>
                                <Button variant="light" size="sm" className="ms-3 rounded-5" onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(mail.id);
                                }}> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="30px" viewBox="0 0 30 30">
                                        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                                    </svg></Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </div>
        </div>
    </>)
}

export default InboxView;