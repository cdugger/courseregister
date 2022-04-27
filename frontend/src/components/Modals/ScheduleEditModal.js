import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


const ScheduleEditModal = (props) => {
    const [inputValue, setInputValue] = useState("");

    const handleConfirm = () => {
        props.onConfirm(inputValue)
        props.hide();
    }

    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit schedule name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Editing {props.scheduleName}</p>
                <FloatingLabel controlId="floatingTextarea" label="Name" className="mb-3">
                    <Form.Control as="textarea" placeholder="" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hide}>
                    No
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );

}

export default ScheduleEditModal;