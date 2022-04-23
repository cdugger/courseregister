import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SearchItem from './SearchItem';
import courses from '../data/courses';
import { subject_data, attributes, components, units } from '../data/course_filters';


const ClassSearch = (props) => {
    const [courseList, setCourseList] = useState();
    const [subject, setSubject] = useState("");
    const [code, setCode] = useState("");

    const filterBySubject = (e) => {
        let subject_find = subject_data.find((x) => {
            return x.subject === e.target.value;
        });

        if(subject_find) {
            let courseFilter = courses.filter(c => {
                return c.subject === subject_find.subject;
            })
            
            if(courseFilter.length > 0) {
                setSubject(subject_find.subject);
                setCode(subject_find.code);
                setCourseList(courseFilter[0].courses);
            }
        }
    }

    useEffect(() => {
  
    })


    return (
        <Modal show={props.show} onHide={props.hide} size="xl" id="class-search">
            <Modal.Header closeButton>
                <Modal.Title>Add/Search Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Floating className="mb-3">
                    <Form.Select className="is-invalid" id="subject-datalist" onChange={filterBySubject} required>
                        <option></option>
                        { subject_data.map(x => (
                            <option key={x.code} value={x.subject}>{x.subject + " (" + x.code + ")"}</option>
                        ))}
                    </Form.Select>
                    <label htmlFor="subject-datalist">Subject</label>
                    <div className="invalid-feedback">Required Field</div>
                </Form.Floating>
                <Form.Floating className="mb-3">
                <Form.Select className="course-attributes" aria-label="Course attribute search">
                    <option></option>
                    {attributes.map(x => (
                        <option key={x}>{x}</option>
                    ))}
                    </Form.Select>
                    <label htmlFor="course-attributes">Course Attributes</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Select className="course-component" aria-label="Course component search">
                        <option></option>
                        {components.map(x => (
                            <option key={x}>{x}</option>
                        ))}
                    </Form.Select>
                    <label htmlFor="course-component">Course Component</label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Select className="units-select" aria-label="Units select">
                        <option selected></option>
                        {units.map(x => (
                            <option key={x}>{x}</option>
                        ))}
                    </Form.Select>
                    <label htmlFor="course-component">Units</label>
                </Form.Floating>
                <Form.Floating>
                    <Form.Check inline label="Mon" name="days" type="checkbox" id="checkbox1" />
                    <Form.Check inline label="Tue" name="days" type="checkbox" id="checkbox2" />
                    <Form.Check inline label="Wed" name="days" type="checkbox" id="checkbox3" />
                    <Form.Check inline label="Thu" name="days" type="checkbox" id="checkbox4" />
                    <Form.Check inline label="Fri" name="days" type="checkbox" id="checkbox5" />
                </Form.Floating>
                <p>Courses found: {courseList ? courseList.length : 0}</p>
                {courseList ? courseList.map(s=> (
                    <SearchItem courseInfo={s} subject={subject} code={code} onCourseAdd={() => props.onCourseAdd(s)}/>
                )) : <></>}
            </Modal.Body>
            <Modal.Footer>

                {/* <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button> */}
            </Modal.Footer>
        </Modal>
    )
}

export default ClassSearch;