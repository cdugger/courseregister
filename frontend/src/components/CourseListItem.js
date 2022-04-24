import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const CourseListItem = (props) => {

    return (
        <ListGroup>
            <ListGroup.Item>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{props.courseInfo.code} {props.courseInfo.number} - {props.courseInfo.title}</h5>
                    <small>3 days ago</small>
                </div>
                <div>{props.courseInfo.title}</div>
            </ListGroup.Item>
            <ListGroup variant="flush">
                <ListGroup.Item><span className="fw-bold">Days/Times:</span>{props.courseInfo.days} {props.courseInfo.timeStart}-{props.courseInfo.timeEnd}</ListGroup.Item>
                <ListGroup.Item><span className="fw-bold">Units: </span>{props.courseInfo.units}</ListGroup.Item>
                <ListGroup.Item><span className="fw-bold">Instructor: </span>{props.courseInfo.instructor}</ListGroup.Item>
            </ListGroup>
            <div className="d-flex w-100 justify-content-end">
                <div className="d-grip gap-1 d-md-block">
                    <Button variant="danger">Drop</Button>
                    <Button variant="primary">Register</Button>
                </div>
            </div>
        </ListGroup>
    );
}

export default CourseListItem;