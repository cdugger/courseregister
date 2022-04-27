import { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


const NewScheduleModal = (props) => {
    const [inputValue, setInputValue] = useState("");
    const nameInput = useRef(null);

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
        nameInput.current.focus();
    }, []);
    
    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Add new schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p></p>
                <FloatingLabel controlId="floatingTextarea" label="Name" className="mb-3">
                    <Form.Control ref={nameInput} type="text" placeholder="" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleEnter} />
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

export default NewScheduleModal;