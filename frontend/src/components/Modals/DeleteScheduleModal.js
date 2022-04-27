import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteScheduleModal = (props) => {

    const handleConfirm = () => {
        props.onConfirm()
        props.hide();
    }

    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Schedule Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you would like to delete {props.scheduleName}?</p>
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

export default DeleteScheduleModal;