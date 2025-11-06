import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toast, ToastContainer, ListGroup, Spinner, Badge } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";

const InboxView = () => {
    const BASE_URL = import.meta.env.VITE_FIREBASE_BASE_URL;
    const email = useSelector((state) => state.auth.userEmailId);
    const safeEmail = email.replace(/\./g, ",");

    const navigate = useNavigate();
    const {setUnreadCount} = useOutletContext();

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
    useEffect(() => {
        fetchInbox();
    }, []);
    if (loading)
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Spinner animation="border" variant="primary" />
            </div>)
    ;
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
                                <small>
                                    {mail.date ? new Date(mail.date).toLocaleDateString() : ""}
                                </small>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </div>
        </div>
    </>)
}

export default InboxView;