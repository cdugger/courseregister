import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ClassSearch from './ClassSearch/ClassSearch';
import DropModal from './Modals/DropModal';
import ScheduleEditModal from './Modals/ScheduleEditModal';
import NewScheduleModal from './Modals/NewScheduleModal';
import DeleteScheduleModal from './Modals/DeleteScheduleModal';
import CourseList from './CourseList/CourseList';
import WeekView from './WeekView/WeekView';
import '../css/Home.css';

const Home = () => {
    const [showCourseAdd, setShowCourseAdd] = useState(false);
    const [showDrop, setShowDrop] = useState(false);
    const [view, setView] = useState('list');
    // const [addedCourses, setAddedCourses] = useState([]);
    const [droppedCourse, setDroppedCourse] = useState({});
    const [statusMessage, setStatusMessage] = useState();
    const listIcon = "bi-card-list";
    const calendarIcon = "bi-calendar";
    // ----- schedule stuff
    // {name: "schedule 1", courses: [{},{}]}
    const [schedule, setSchedule] = useState([{ name: "Main Schedule", courses: [] }]);
    const [scheduleEditModalShow, setScheduleEditModalShow] = useState(false);
    const [deleteScheduleModalShow, setDeleteScheduleModalShow] = useState(false);
    const [newScheduleModalShow, setNewScheduleModalShow] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(0);

    const handleSearchHide = () => {
        setShowCourseAdd(false);
        setStatusMessage("");
    }

    const showEditScheduleModal = () => {
        setScheduleEditModalShow(true);
    }

    const showNewScheduleModal = () => {
        setNewScheduleModalShow(true);
    }

    const handleDeleteScheduleModal = () => {
        if (!schedule[selectedSchedule]) {
            return;
        }
        setDeleteScheduleModalShow(true);
    }

    const addNewSchedule = (name) => {
        let temp = [...schedule];
        temp.push({ name: name, courses: [] });
        setSchedule(temp);
        setSelectedSchedule(temp.length - 1);
    }

    const deleteSchedule = () => {
        // Prevent the main schedule from being deleted
        if (schedule.length === 1 || selectedSchedule == 0) {
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
        let conflictCheck = temp[selectedSchedule].courses.filter(c => {
            return c.crn === course.crn;
        });
        if (conflictCheck.length === 0) {
            temp[selectedSchedule].courses.push(course);
            setSchedule(temp);
            setStatusMessage({text: `Successfully added ${course.subject}-${course.number} to schedule`, success: true});
        } else {
            setStatusMessage({text: "That course has already been added", success: false});
        }
    }

    return (
        <Container className="border" id="content">
            {
                deleteScheduleModalShow ?
                    <DeleteScheduleModal show={deleteScheduleModalShow} hide={() => setDeleteScheduleModalShow(false)} scheduleName={schedule[selectedSchedule] ? schedule[selectedSchedule].name : ""} onConfirm={deleteSchedule} />
                    :
                    <></>
            }

            {
                newScheduleModalShow ?
                    <NewScheduleModal show={newScheduleModalShow} hide={() => setNewScheduleModalShow(false)} onConfirm={addNewSchedule} />
                    :
                    <></>
            }

            {
                scheduleEditModalShow ?
                    <ScheduleEditModal show={scheduleEditModalShow} hide={() => setScheduleEditModalShow(false)} scheduleName={schedule[selectedSchedule] ? schedule[selectedSchedule].name : ""} onConfirm={editScheduleName} />
                    :
                    <></>
            }

            {showDrop ?
                <DropModal show={showDrop} hide={() => setShowDrop(false)} course={droppedCourse} onConfirm={dropCourse} />
                :
                <></>
            }


            <h2 className="display-5 py-5">Schedule Builder</h2>
            <hr />
            <Container className="w-75 mx-auto">
                <Row>
                    <Col className="py-2">
                        <Button variant="success" size="lg" onClick={() => setShowCourseAdd(true)}>
                            Search/Add Courses
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Select className="fs-5" onChange={(e) => handleSelectSchedule(e.target.value)}>
                            {
                                schedule.map((s, i) => (
                                    <option key={i} value={i} selected={selectedSchedule === i}>{s.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Col>
                    <Col md={1}>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-1">Edit Schedule</Tooltip>}>
                            <i className="bi bi-pencil-fill fs-2" onClick={showEditScheduleModal} style={{ "cursor": "pointer" }}></i>
                        </OverlayTrigger>
                    </Col>
                    <Col md={1}>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Add Schedule</Tooltip>}>
                            <i className="bi bi-file-earmark-plus fs-2 text-success" onClick={showNewScheduleModal} style={{ "cursor": "pointer" }}></i>
                        </OverlayTrigger>
                    </Col>
                    <Col md={1}>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-3">Delete Schedule</Tooltip>}>
                            <i className="bi bi-file-earmark-x fs-2 text-danger" onClick={handleDeleteScheduleModal} style={{ "cursor": "pointer" }}></i>
                        </OverlayTrigger>
                    </Col>
                    <Col md={{ span: 1, offset: 4 }} className="text-end">
                        <OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-4">Change View</Tooltip>}>
                            <Dropdown id="view-dropdown">
                                <Dropdown.Toggle variant="light" size="sm" id="schedule-view">
                                    <i className={view === 'list' ? listIcon : calendarIcon} style={{ fontSize: "2rem", color: "black" }}></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ "min-width": "2rem" }}>
                                    <Dropdown.Item onClick={toggleScheduleView}>
                                        <i className={view === 'list' ? calendarIcon : listIcon} style={{ fontSize: "2rem", color: "black" }}></i>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </OverlayTrigger>
                    </Col>
                </Row>

            </Container>
            <hr />
            <Container className="w-90 py-3">
                {view === 'list' ?
                    schedule[selectedSchedule].courses.length > 0 ?
                        <CourseList courses={schedule[selectedSchedule].courses} onDrop={showDropCourseModal} />
                        :
                        <Row className="text-center">
                            <p>No classes added to this schedule</p>
                            <span><small className="text-muted"> Click the <b>Search/Add Courses</b> button to start adding classes</small></span>
                        </Row>

                    : <WeekView courses={schedule[selectedSchedule].courses} />}
                {
                    showCourseAdd ? <ClassSearch message={statusMessage} show={showCourseAdd} hide={handleSearchHide} onCourseAdd={addCourse} /> : <></>
                }
            </Container>
        </Container>
    );
}

export default Home;