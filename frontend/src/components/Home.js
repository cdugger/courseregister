import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import ClassSearch from './ClassSearch/ClassSearch';
import DropModal from './Modals/DropModal';
import ScheduleEditModal from './Modals/ScheduleEditModal';
import NewScheduleModal from './Modals/NewScheduleModal';
import DeleteScheduleModal from './Modals/DeleteScheduleModal';
import CourseList from './CourseList/CourseList';
import WeekView from './WeekView/WeekView';
import notFound from '../images/no-classes.jpg'

const Home = () => {
    const [showCourseAdd, setShowCourseAdd] = useState(false);
    const [showDrop, setShowDrop] = useState(false);
    const [view, setView] = useState('list');
    // const [addedCourses, setAddedCourses] = useState([]);
    const [droppedCourse, setDroppedCourse] = useState({});
    const listIcon = "bi-card-list";
    const calendarIcon = "bi-calendar";
    // ----- schedule stuff
    // {name: "schedule 1", courses: [{},{}]}
    const [schedule, setSchedule] = useState([{name: "Main Schedule", courses: []}]);
    const [scheduleEditModalShow, setScheduleEditModalShow] = useState(false);
    const [deleteScheduleModalShow, setDeleteScheduleModalShow] = useState(false);
    const [newScheduleModalShow, setNewScheduleModalShow] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(0);

    const showEditScheduleModal = () => {
        setScheduleEditModalShow(true);
    }

    const showNewScheduleModal = () => {
        setNewScheduleModalShow(true);
    }

    const handleDeleteScheduleModal = () => {
        if(!schedule[selectedSchedule]) {
            return;
        }
        setDeleteScheduleModalShow(true);
    }

    const addNewSchedule = (name) => {
        let temp = [...schedule];
        temp.push({name: name, courses: []});
        setSchedule(temp);
        setSelectedSchedule(temp.length - 1);
    }

    const deleteSchedule = () => {
        // Prevent the main schedule from being deleted
        if(schedule.length === 1 || selectedSchedule == 0) {
            return;
        }
        let temp = [...schedule];
        temp.splice(selectedSchedule, 1);
        setSchedule(temp);
        setSelectedSchedule(selectedSchedule - 1);
    }

    const editScheduleName = (name) => {
        let temp = [...schedule];
        temp[selectedSchedule].name = name;
        setSchedule(temp);
    }

    const handleSelectSchedule = (i) => {
        setSelectedSchedule(i);
    }

    const dropCourse = () => {
        let temp = [...schedule];
        temp[selectedSchedule].courses.splice(droppedCourse.id, 1);
        setSchedule(temp);
        setShowDrop(false);
    }

    const showDropCourseModal = (course, idx) => {
        setShowDrop(true);
        setDroppedCourse({ name: course, id: idx });
    }
    const toggleScheduleView = () => {
        setView(view === 'list' ? 'calendar' : 'list');
    }

    const addCourse = (course) => {
        let temp = [...schedule];
        temp[selectedSchedule].courses.push(course);
        setSchedule(temp);
    }

    useEffect(() => {
        console.log(schedule);
    }, [schedule])

    return (
        <Container>
            
            <DeleteScheduleModal show={deleteScheduleModalShow} hide={() => setDeleteScheduleModalShow(false)} scheduleName={schedule[selectedSchedule] ? schedule[selectedSchedule].name: ""} onConfirm={deleteSchedule} />
            <NewScheduleModal show={newScheduleModalShow} hide={() => setNewScheduleModalShow(false)} onConfirm={addNewSchedule} />
            <ScheduleEditModal show={scheduleEditModalShow} hide={() => setScheduleEditModalShow(false)} scheduleName={schedule[selectedSchedule] ? schedule[selectedSchedule].name: ""} onConfirm={editScheduleName} /> 
            <DropModal show={showDrop} hide={() => setShowDrop(false)} course={droppedCourse} onConfirm={dropCourse} />
          
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
                        <Form.Select aria-label="Default select example" onChange={(e) => handleSelectSchedule(e.target.value)}>
                            {
                                schedule.map((s, i) => (
                                    <option key={i} value={i} selected={selectedSchedule === i}>{s.name}</option>
                                ))
                            }
                            
                        </Form.Select>
                    </Col>
                    <Col>
                        <i className="bi bi-pencil-fill fs-3" onClick={showEditScheduleModal}></i>
                    </Col>
                    <Col>
                        <div className="d-grid gap-1 d-md-block">
                            <Button variant="info" onClick={showNewScheduleModal}>New Schedule</Button>
                            <Button variant="danger" onClick={handleDeleteScheduleModal}>Delete Schedule</Button>
                        </div>
                    </Col>
                    <Col className="text-end">
                        <Dropdown>
                            <Dropdown.Toggle id="schedule-view">
                                <i className={view === 'list' ? listIcon : calendarIcon} style={{ fontSize: "2rem", color: "white" }}></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={toggleScheduleView}>
                                    <i className={view === 'list' ? calendarIcon : listIcon} style={{ fontSize: "2rem", color: "cornflowerblue" }}></i>
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
                schedule[selectedSchedule].courses.length > 0 ?
                    <CourseList courses={ schedule[selectedSchedule].courses} onDrop={showDropCourseModal} />
                    :
                    <>
                        <p>No classes added to this schedule</p>
                        <span><small class="text-muted"> Click the <b>Search/Add Course</b> button to start adding classes</small></span>
                    </>
      
                : <WeekView courses={ schedule[selectedSchedule].courses} />}
            {
                showCourseAdd ? <ClassSearch show={showCourseAdd} hide={() => setShowCourseAdd(false)} onCourseAdd={addCourse} /> : <></>
            }

        </Container>
    );
}

export default Home;