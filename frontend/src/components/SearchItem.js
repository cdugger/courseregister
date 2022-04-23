import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import {formatTime} from '../util/util';

const SearchItem = (props) => {

    return (
        <ListGroup>
            <ListGroup.Item className="m-3">
                <Row>
                    <Col><h5>{props.code}-{props.courseInfo.number} {props.courseInfo.title}</h5></Col>
                </Row>
                <Row>
                    <Col>
                        <Row>CRN</Row>
                        <Row>{2001}</Row>
                    </Col>
                    <Col>
                        <Row>Meeting Times</Row>
                        <Row>{formatTime(props.courseInfo.timeStart)}-{formatTime(props.courseInfo.timeEnd)}</Row>
                    </Col>
                    <Col>
                        <Row>Days</Row>
                        <Row>{props.courseInfo.days}</Row>
                    </Col>
                    <Col>
                        <Row>Units</Row>
                        <Row>{props.courseInfo.units ? props.courseInfo.units: 'TBA'}</Row>
                    </Col>
                    <Col>
                        <Row>Instructor</Row>
                        <Row>{props.courseInfo.instructor}</Row>
                    </Col>
                    <Col>
                        <Row>Prerequisites</Row>
                        <Row>
                            <Col>
                                {props.courseInfo.prerequisites.map((c) => (
                                    <Badge bg="warning" text="dark">
                                        {c}
                                    </Badge>
                                ))}
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Button variant="secondary">Details</Button>{' '}
                        <Button variant="success" onClick={props.onCourseAdd}>Add</Button>{' '}
                    </Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
    );
}

export default SearchItem;