import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { formatTime } from '../../util/util';

const CourseListItem = (props) => {
    const [registered, setRegistered] = useState(false);

    const handleDrop = () => {
        console.log(props)
        props.onDrop(props.courseInfo, props.id);
    }

    return (
        <ListGroup variant="flush" className="border m-3">
            <ListGroup.Item>
                {registered ? <span class="badge rounded-pill bg-success">Registered</span> : ""}
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{props.courseInfo.subject} {props.courseInfo.code} {props.courseInfo.number} - {props.courseInfo.title}</h5>
                </div>
            </ListGroup.Item>

            <ListGroup.Item><span className="fw-bold">Meeting Days: </span>{props.courseInfo.days}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold">Time: </span>{formatTime(props.courseInfo.timeStart)}-{formatTime(props.courseInfo.timeEnd)}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold">Units: </span>{props.courseInfo.units}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold">Instructor: </span>{props.courseInfo.instructor}</ListGroup.Item>
            <ListGroup.Item><span className="fw-bold">Description: </span>{props.courseInfo.description}</ListGroup.Item>

            <Row className="d-grid justify-content-end">
                <Col>
                    <Button className="m-2" variant="danger" onClick={handleDrop}>Drop</Button>
                    <Button variant="primary" onClick={() => setRegistered(true)}>Register</Button>
                </Col>
            </Row>
        </ListGroup>
    );
}

export default CourseListItem;