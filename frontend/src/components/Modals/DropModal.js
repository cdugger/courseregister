import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DropModal = (props) => {

    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Drop Confirmation</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure you want to drop <strong>{props.course.name.subject}-{props.course.name.number} {props.course.name.title}</strong>?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.hide}>No</Button>
                <Button variant="primary" onClick={props.onConfirm}>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DropModal;