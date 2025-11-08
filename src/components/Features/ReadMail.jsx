import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Toast, ToastContainer, Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useMailApi from "../../hooks/useMailApi";

const ReadMail = ({type}) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_FIREBASE_BASE_URL;
    const email = useSelector((state) => state.auth.userEmailId);
    const safeEmail = email.replace(/\./g, ",");

    const [mail, setMail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
        show: false, variant: "", message: "", textColor: ""
    })
    const { markAsRead } = useMailApi(BASE_URL);

    useEffect(() => {
        const fetchMail = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/mails/${safeEmail}/${type}/${id}.json`);
                const data = await response.json();
                setMail(data);

                if (type === "inbox" && data && !data.read) {
                    await markAsRead(`mails/${safeEmail}/inbox/${id}`);
                }
            } catch (error) {
                setToast({
                    show: true, variant: "danger", textcolor: "text-white", message: "Failed to load the mail, please try again later!"
                });
                console.log(error.message);
            } finally {
                setLoading(false)
            }
        }
        fetchMail();
    }, [id, type])

    if (loading) return <div
        className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Spinner animation="border" variant="primary" />
    </div>;

    if (!mail) return <p className="text-danger">Mail not found!</p>;
    return (<>
        <Button
            variant="transparent"
            className="mb-3 shadow-sm"
            onClick={() => navigate(`/home/${type}`)}
        >← Back to {type}</Button>

        <ToastContainer position="top-end" className="m-3">
            <Toast
                bg={toast.variant}
                show={toast.show}
                onClose={() => setToast({ ...toast, show: false })}
                delay={3000} autohide>
                <Toast.Body className={toast.textColor}>{toast.message}</Toast.Body>
            </Toast>
        </ToastContainer>
        <Card className="p-4 shadow-sm border-0">
            <h4>{mail.subject}</h4>
            <p className="text-muted mb-2">
                <strong>{type === "inbox" ? "From" : "To"}: </strong> 
                {type === "inbox" ? mail.from : mail.to}
            </p>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: mail.body }} />
        </Card>
    </>)
}

export default ReadMail;