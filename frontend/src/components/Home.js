import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import ClassSearch from './ClassSearch/ClassSearch';
import DropModal from './DropModal';
import CourseList from '../CourseList/CourseList';
import WeekView from './WeekView/WeekView';

const Home = () => {
    const [showCourseAdd, setShowCourseAdd] = useState(false);
    const [showDrop, setShowDrop] = useState(false);
    const [view, setView] = useState('list');
    const [addedCourses, setAddedCourses] = useState([]);
    const [droppedCourse, setDroppedCourse] = useState();
    const listIcon = "bi-card-list";
    const calendarIcon = "bi-calendar";

    const hideCourseAdd = () => {
        setShowCourseAdd(false);
    }

    const hideDropModal = () => {
        setShowDrop(false);
    }

    const dropCourse = () => {
        let temp = [...addedCourses];
        console.log('idx is ' + droppedCourse.id);
        temp.splice(droppedCourse.id, 1);
        setAddedCourses(temp);

        setShowDrop(false);
        console.log('Dropping course:');
        console.log(droppedCourse);
    }

    const showDropCourseModal = (course, idx) => {
        setShowDrop(true);
        setDroppedCourse({course: course, id: idx});
        console.log(course);
        console.log(idx);
    }
    const toggleScheduleView = () => {
        setView(view === 'list' ? 'calendar' : 'list');
    }

    const addCourse = (course) => {
        let temp = [...addedCourses];
        temp.push(course);
        setAddedCourses(temp);
    }

    return (
        <Container>
            {showDrop ?
                <DropModal show={showDrop} hide={hideDropModal} course={droppedCourse.course} onConfirm={dropCourse}/>
                : <></>
            }

            <h2 className="display-5 py-5">Schedule Builder</h2>
            <hr />
            <Row className="w-75 px-3">
                <Row md={5} className="m-2">
                    <Button variant="primary" onClick={() => setShowCourseAdd(true)}>
                        Search/Add Course
                    </Button>
                </Row>
                <Row>
                    <Col>
                        <Form.Select aria-label="Default select example">
                            <option selected>Schedule 1</option>
                            <option value="1">Schedule 2</option>
                            <option value="2">Schedule 3</option>
                            <option value="3">Schedule 4</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <div className="d-grid gap-1 d-md-block">
                            <Button variant="info">New Schedule</Button>
                            <Button variant="danger">Delete Schedule</Button>
                        </div>
                    </Col>
                    <Col className="text-end">
                        <Dropdown>
                            <Dropdown.Toggle id="schedule-view">
                                <i className={view === 'list' ? listIcon : calendarIcon} style={{ fontSize: "2rem", color: "white" }}></i>
                                {/* {view === 'list' ? " List" : " Calendar"} */}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={toggleScheduleView}>
                                    <i className={view === 'list' ? calendarIcon : listIcon} style={{ fontSize: "2rem", color: "cornflowerblue" }}></i>
                                    {/* {view === 'list' ? " Calendar" : " List"} */}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                </Row>
            </Row>
            {view === 'list' ?
                addedCourses.length > 0 ?
                    <CourseList courses={addedCourses} onDrop={showDropCourseModal} />
                    :
                    <p>No classes added</p>
                : <WeekView courses={addedCourses} />}
            {
                showCourseAdd ? <ClassSearch show={showCourseAdd} hide={hideCourseAdd} onCourseAdd={addCourse} /> : <></>
            }

        </Container>
    );
}

export default Home;