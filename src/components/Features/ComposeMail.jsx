import { Card, Toast, ToastContainer, Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import { useSelector } from "react-redux"; // to access sender email later


const ComposeMail = () => {
    const [formData, setFormData] = useState({
        to: "",
        subject: "",
        body: "",
    })
    const BASE_URL = import.meta.env.VITE_FIREBASE_BASE_URL;
    const [sending, setSending] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        variant: "",
    });

    const loginEmail = useSelector((state) => state.auth.userEmailId);
    const senderEmail = loginEmail;


    const handleSendEvent = async (e) => {
        e.preventDefault();

        const isEmail = /\S+@\S+\.\S+/;
        if (!isEmail.test(formData.to)) {
           return setToast({
                show: true, message: "Invalid email address", variant: "danger", textColor: "text-white",
            });
        }
        try {
            setSending(true);
            const safeSender = senderEmail.replace(/\./g, ",");
            const safeReceiver = formData.to.replace(/\./g, ",");
            const mailData = {
                from: senderEmail,
                to: formData.to,
                subject: formData.subject,
                body: formData.body,
                date:new Date().toISOString(),
                read: false,
            }

            await fetch(`${BASE_URL}/mails/${safeSender}/sent.json`, {
                method: "POST",
                body: JSON.stringify(mailData),
                headers: { 'Content-type': 'application/json' },
            });

            await fetch(`${BASE_URL}/mails/${safeReceiver}/inbox.json`, {
                method: "POST",
                body: JSON.stringify(mailData),
                headers: { 'Content-type': 'application/json' },
            });

            setToast({
                show: true, message: "Email sent successfully", variant: "success", textColor: "text-white"
            })

            setFormData({ to: "", subject: "", body: "" });
        } catch (error) {
            setToast({
                show: true, message: "⚠️Failed to send email! check connection", variant: "danger", textColor: "text-white"
            })
            console.log(error.message);
        } finally {
            setSending(false);
        }
    }

    return (
        <>
            <ToastContainer position="top-end">
                <Toast
                    bg={toast.variant}
                    show={toast.show}
                    onClose={() => setToast({ ...toast, show: false })}
                    delay={3000} autohide
                >
                    <Toast.Body className={toast.textColor}>{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className="d-flex justify-content-center">
                <Card className=" p-3 shadow rounded-0  justify-content-center">
                    <Form onSubmit={handleSendEvent}>
                        <Form.Group controlId="toEmail" className="d-flex align-items-center gap-2">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="receiver's email"
                                value={formData.to}
                                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                className="w-auto "
                                required
                                disabled={sending}
                            />
                        </Form.Group>
                        {formData.to === "" && (
                                <small className="text-danger ms-2">Recipient email required</small>
                            )}
                        <Form.Group controlId="subject" className="mt-2">
                            <Form.Control
                                type="text"
                                name="subject"
                                placeholder="Write subject "
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                                disabled={sending}
                            />
                            {formData.subject === "" && (
                                <small className="text-danger ms-2">subject required</small>
                            )}
                        </Form.Group>

                        <Form.Group controlId="textarea" className="mt-3">
                            <Form.Label>Message:</Form.Label>
                            <FroalaEditorComponent
                                tag="textarea"
                                model={formData.body}
                                onModelChange={(content) =>
                                    setFormData({ ...formData, body: content })
                                }
                                disabled={sending}
                            />
                        </Form.Group>
                        <Button variant="primary" style={{ minWidth: "90px" }} type="submit" className="mt-3 ms-auto d-block w-20" disabled={sending}>{sending ? <Spinner size="sm" animation="border" />  : "Send"}</Button>
                    </Form>
                </Card>
            </div>
        </>
    );
}

export default ComposeMail;