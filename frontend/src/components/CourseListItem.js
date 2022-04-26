import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { formatTime } from '../util/util';

const CourseListItem = (props) => {

    return (
        <ListGroup className="border m-3">
            <ListGroup.Item>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{props.courseInfo.code} {props.courseInfo.number} - {props.courseInfo.title}</h5>
                </div>
                <div>{props.courseInfo.title}</div>
            </ListGroup.Item>
            <ListGroup variant="flush">
                <ListGroup.Item><span className="fw-bold">Meeting Days: </span>{props.courseInfo.days}</ListGroup.Item>
                <ListGroup.Item><span className="fw-bold">Time: </span>{formatTime(props.courseInfo.timeStart)}-{formatTime(props.courseInfo.timeEnd)}</ListGroup.Item>
                <ListGroup.Item><span className="fw-bold">Units: </span>{props.courseInfo.units}</ListGroup.Item>
                <ListGroup.Item><span className="fw-bold">Instructor: </span>{props.courseInfo.instructor}</ListGroup.Item>
            </ListGroup>
            <Row className="d-grid justify-content-end">
                <Col>
                    <Button className="m-2" variant="danger">Drop</Button>
                    <Button variant="primary">Register</Button>
                </Col>
            </Row>
        </ListGroup>
    );
}

export default CourseListItem;