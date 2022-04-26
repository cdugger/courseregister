import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const scheduleEditModal = (props) => {

    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.course.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Would you like to add <strong>{props.course.title}</strong> to your schedule?</p></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.hide}>
                    No
                </Button>
                <Button variant="primary" onClick={props.onConfirm}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default scheduleEditModal;