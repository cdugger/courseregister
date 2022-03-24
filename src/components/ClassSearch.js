import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const ClassSearch = () => {

    return (
        <Modal.Dialog size="xl" id="class-search">
            <Modal.Header closeButton>
                <Modal.Title>Add/Search Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Floating className="mb-3">
                    <Form.Control id="subject-datalist" list="subject-list" />
                    <label htmlFor="subject-datalist">Subject</label>
                    <datalist id="subject-list">
                        <option value="Computer Science (CSC)" />
                        <option value="Classics (CLAS)" />
                        <option value="Accounting (ACCT)" />
                    </datalist>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control id="course-attributes" />
                    <label htmlFor="course-attributes">Course Attributes</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Select className="course-component" aria-label="Course component search">
                        <option selected> </option>
                        <option value="1"> </option>
                        <option value="2">Colloquium</option>
                        <option value="3">Discussion</option>
                        <option value="4">Independent Study</option>
                    </Form.Select>
                    <label htmlFor="course-component">Course Component</label>
                </Form.Floating>
                <Form.Floating>
                    <Form.Check inline label="Mon" name="days" type="checkbox" id="checkbox1" />
                    <Form.Check inline label="Tue" name="days" type="checkbox" id="checkbox2" />
                    <Form.Check inline label="Wed" name="days" type="checkbox" id="checkbox3" />
                    <Form.Check inline label="Thu" name="days" type="checkbox" id="checkbox4" />
                    <Form.Check inline label="Fri" name="days" type="checkbox" id="checkbox5" />
                </Form.Floating>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
    )
}

export default ClassSearch;