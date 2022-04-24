import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SearchItem from './SearchItem';
import courses from '../data/courses';
import { subject_data, attributes, components, units } from '../data/course_filters';


const ClassSearch = (props) => {
    const [courseList, setCourseList] = useState(); // list of courses by subject. filters do not modify this list. Used for reverting filters.
    const [filteredCourseList, setFilteredCourseList] = useState(); // filters modify this course list
    const [filteredDays, setFilteredDays] = useState([]);
    const [subject, setSubject] = useState("");
    const [code, setCode] = useState("");

    const filterBySubject = (e) => {
        let subject_find = subject_data.find((x) => {
            return x.subject === e.target.value;
        });

        if (subject_find) {
            let courseFilter = courses.filter(c => {
                return c.subject === subject_find.subject;
            })

            if (courseFilter.length > 0) {
                setSubject(subject_find.subject);
                setCode(subject_find.code);
                setCourseList(courseFilter[0].courses);
                setFilteredCourseList(courseFilter[0].courses);
            }
        }
    }

    const filterByDay = (e) => {
        if (!courseList)
            return;

        const selectedDay = e.target.name;
        if (e.target.checked) {
            let updatedFilteredDays = [...filteredDays];
            updatedFilteredDays.push(selectedDay);
            setFilteredDays(updatedFilteredDays);
            console.log('Applying filter')
            // let newCourseList = filteredCourseList.filter(course => {
            //     return course.days.indexOf(selectedDay) !== -1;
            // });
            // setFilteredCourseList(newCourseList);
        } else {
            let newDays = filteredDays.filter(day => {
                return day !== selectedDay;
            });
            setFilteredDays(newDays);
        }
    }

    useEffect(() => {
        function reapplyAllFilters() {
            console.log('Reapplying filteres')
            // day filters
            let originalCourseList = [...courseList];
            // console.log(`Original course list:`);
            // console.log(originalCourseList)
            console.log('Filtered days:');
            console.log(filteredDays);
            originalCourseList = originalCourseList.filter(course => {
                for(let i = 0; i < filteredDays.length; i++) {
                    // console.log(`Checking ${filteredDays[i]}`);
                    if(course.days.indexOf(filteredDays[i]) === -1) {
                        return false;
                    }
                }
                return true;
            });
            // console.log(`Course list filtered`);
            // console.log(originalCourseList);
            setFilteredCourseList(originalCourseList);
        }
        // console.log('Filtered days changed');
        if(courseList) {
            reapplyAllFilters();
        }
        
    }, [courseList, filteredDays]);

    // useEffect(() => {
    //     console.log(courseList)
    // }, [courseList])

    return (
        <Modal show={props.show} onHide={props.hide} size="xl" id="class-search">
            <Modal.Header closeButton>
                <Modal.Title>Add/Search Course</Modal.Title>
                {filteredDays}
            </Modal.Header>
            <Modal.Body>
                <Form.Floating className="mb-3">
                    <Form.Select className="is-invalid" id="subject-datalist" onChange={filterBySubject} required>
                        <option></option>
                        {subject_data.map(x => (
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
                        {components.map((x,i) => (
                            <option key={i}>{x}</option>
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
                    {["Mon", "Tue", "Wed", "Thu", "Fri"].map((dayName, i) => (
                        <Form.Check key={i} inline label={dayName} name={dayName} type="checkbox" id={"dayCheckbox" + i} onClick={filterByDay} />
                    ))}
                </Form.Floating>
                <p>Courses found: {filteredCourseList ? filteredCourseList.length : 0}</p>
                {filteredCourseList ? filteredCourseList.map((s, i) => (
                    <SearchItem key={i} courseInfo={s} subject={subject} code={code} onCourseAdd={() => props.onCourseAdd(s)} />
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