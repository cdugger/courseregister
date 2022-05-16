import { useEffect, useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


const ScheduleEditModal = (props) => {
    const [inputValue, setInputValue] = useState(props.scheduleName);
    const editInput = useRef(null);

    const handleConfirm = () => {
        props.onConfirm(inputValue)
        props.hide();
    }

    const handleEnter = (e) => {
        if(e.key === "Enter") {
            e.preventDefault();
            handleConfirm();
        }
    }

    useEffect(() => {
        editInput.current.focus();
    }, [])

    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit schedule name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Editing <strong>{props.scheduleName}</strong></p>
                <FloatingLabel controlId="floatingTextarea" label="Name" className="mb-3">
                    <Form.Control ref={editInput} type="email" placeholder="" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyUp={handleEnter} />
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default ScheduleEditModal;