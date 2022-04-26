import { useState, useEffect, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ClassSearchAddModal from './ClassSearchAddModal';
import SearchItem from './SearchItem';
import courses from '../data/courses';
import { subject_data, attributes, components } from '../data/course_filters';


const ClassSearch = (props) => {
    const [courseList, setCourseList] = useState(); // list of courses by subject. filters do not modify this list. Used for reverting filters.
    const [filteredCourseList, setFilteredCourseList] = useState(); // filters modify this course list
    const [filteredDays, setFilteredDays] = useState([]);
    const [selectedCourseInfo, setSelectedCourseInfo] = useState();
    const [loading, setLoading] = useState(false);
    const [subject, setSubject] = useState("");
    const [code, setCode] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedUnits, setSelectedUnits] = useState(0);
    const [selectedUnitsLabel, setSelectedUnitsLabel] = useState(0); // Only used for the label showing the selected # of units.

    const filterBySubject = (e) => {
        let subject_find = subject_data.find((x) => {
            return x.subject === e.target.value;
        });

        if (subject_find) {
            let courseFilter = courses.filter(c => {
                return c.subject === subject_find.subject;
            });
            if (courseFilter.length > 0) {
                setSubject(subject_find.subject);
                setCode(subject_find.code);
                setCourseList(courseFilter[0].courses);
                setFilteredCourseList(courseFilter[0].courses);
            }
        }
    }

    const addFilteredDay = (e) => {
        if (!courseList)
            return;

        const selectedDay = e.target.name;
        if (e.target.checked) {
            let updatedFilteredDays = [...filteredDays];
            updatedFilteredDays.push(selectedDay);
            setFilteredDays(updatedFilteredDays);
        } else {
            let newDays = filteredDays.filter(day => {
                return day !== selectedDay;
            });
            setFilteredDays(newDays);
        }
    }

    const handleUnitChange = (e) => {
        if (!courseList)
            return

        const unitValue = e.target.value;
        setSelectedUnits(unitValue);
    }

    const handleCourseAdd = (courseInfo) => {
        setShowAddModal(true);
        props.onCourseAdd(courseInfo);
        setSelectedCourseInfo(courseInfo);
    }

    useEffect(() => {
        const applyFilters = () => {
            let modifiedCourseList = [...courseList];
            const filters = [applyDayFilter, applyUnitFilter];
            for (const filter of filters) {
                modifiedCourseList = modifiedCourseList.filter(filter);
            }
            setFilteredCourseList(modifiedCourseList);
        };

        const applyDayFilter = (course) => {
            console.log(`Applying day filter on`);
            for (let i = 0; i < filteredDays.length; i++) {
                if (course.days.indexOf(filteredDays[i]) === -1) {
                    return false;
                }
            }
            return true;
        };

        const applyUnitFilter = (course) => {
            if (selectedUnits == 0) {
                return true;
            }
            console.log("Applying unit filter")
            const cUnits = String(course.units);
            const hyphenIdx = cUnits.indexOf('-');
            if (hyphenIdx !== -1) {
                // some courses have a range of units i.e. 1-5
                let lowerUnits = Number(cUnits.substring(0, hyphenIdx));
                let upperUnits = Number(cUnits.substring(hyphenIdx + 1));
                if (!Number.isNaN(lowerUnits) && !Number.isNaN(upperUnits)) {
                    if (selectedUnits >= lowerUnits && selectedUnits <= upperUnits) {
                        return true;
                    }
                }
            } else {
                if (course.units == selectedUnits) {
                    return true;
                }
            }

            return false;
        };


        const load = (ms) => {
            setLoading(true);
            setTimeout(() => { setLoading(false) }, ms);
        }

        if (courseList) {
            applyFilters();
            load(500);
        }

    }, [courseList, filteredDays, selectedUnits]);

    return (
        <>
            <ClassSearchAddModal show={showAddModal} hide={() => setShowAddModal(false)} course={selectedCourseInfo} />
            <Modal show={props.show} onHide={props.hide} size="xl" id="class-search">
                <Modal.Header closeButton>
                    <Modal.Title>Add/Search Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*
                        Subject Select
                    */}
                    <Form.Floating className="mb-3 w-50">
                        <Form.Select className={courseList ? "" : "is-invalid"} id="subject-datalist" onChange={filterBySubject}>
                            <option></option>
                            {subject_data.map(x => (
                                <option key={x.code} value={x.subject}>{x.subject + " (" + x.code + ")"}</option>
                            ))}
                        </Form.Select>
                        <label htmlFor="subject-datalist">Subject</label>
                        <div className="invalid-feedback">Required Field</div>
                    </Form.Floating>
                    {/*
                        Attribute Select
                    */}
                    <Form.Floating className="mb-3 w-50">
                        <Form.Select className="course-attributes" aria-label="Course attribute search">
                            <option></option>
                            {attributes.map(x => (
                                <option key={x}>{x}</option>
                            ))}
                        </Form.Select>
                        <label htmlFor="course-attributes">Course Attributes</label>
                    </Form.Floating>
                    {/*
                        Component Select
                    */}
                    <Form.Floating className="mb-3 w-50">
                        <Form.Select className="course-component" aria-label="Course component search">
                            <option></option>
                            {components.map((x, i) => (
                                <option key={i}>{x}</option>
                            ))}
                        </Form.Select>
                        <label htmlFor="course-component">Course Component</label>
                    </Form.Floating>
                    {/*
                        Unit Slider
                    */}
                    <Form.Floating className="mb-3 w-25">
                        <Form.Label>Units: {selectedUnitsLabel && selectedUnitsLabel != 0 ? selectedUnitsLabel : "Any"}</Form.Label>
                        <Form.Range min="0" max="10" step="1" onMouseUp={handleUnitChange} value={selectedUnitsLabel} onChange={(e) => setSelectedUnitsLabel(e.target.value)} disabled={!courseList} />
                    </Form.Floating>
                    {/*
                        Day Checkboxes
                    */}
                    <Form.Floating>
                        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((dayName, i) => (
                            <Form.Check disabled={courseList ? false : true} key={i} inline label={dayName} name={dayName} type="checkbox" id={"dayCheckbox" + i} onClick={addFilteredDay} />
                        ))}
                    </Form.Floating>
                    <hr />
                </Modal.Body>
                <Modal.Body>
                    <p>Courses found: {filteredCourseList ? filteredCourseList.length : 0}</p>
                    {(filteredCourseList && !loading) ? filteredCourseList.map((course, i) => (
                        <SearchItem key={i} courseInfo={course} subject={subject} code={code} onCourseAdd={() => handleCourseAdd(course)} />
                    )) :
                        <Row>
                            <Col md={{ span: 6, offset: 5 }}>
                                <Spinner className="mx-auto" animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </Col>
                        </Row>
                    }
                </Modal.Body>
                <Modal.Footer>

                    {/* <Button variant="secondary">Close</Button>
                <Button variant="primary">Save changes</Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ClassSearch;