import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';

const ClassSearchAddModal = (props) => {

    const handleYes = () => {
        props.hide();
        
    }

    return (
        <>
        {props.course ?
            <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.course.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Would you like to add <strong>{props.course.title}</strong> to your schedule?</p></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={''}>
                    No
                </Button>
                <Button variant="primary" onClick={''}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
        : <></>
        }
        </>
    )
}

export default ClassSearchAddModal;