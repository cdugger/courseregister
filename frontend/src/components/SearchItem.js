import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { formatTime } from '../util/util';

const SearchItem = (props) => {

    return (
        <ListGroup>
            <ListGroup.Item className="m-3">
                <Row>
                    <Col><h5>{props.code}-{props.courseInfo.number} {props.courseInfo.title}</h5></Col>
                    <hr />
                </Row>
                <Row>
                    <Col>
                        <Row><p><strong>CRN</strong></p></Row>
                        <Row><p>{2001}</p></Row>
                    </Col>
                    <Col>
                        <Row><p><strong>Meeting Times</strong></p></Row>
                        <Row><p>{formatTime(props.courseInfo.timeStart)} - {formatTime(props.courseInfo.timeEnd)}</p></Row>
                    </Col>
                    <Col>
                        <Row><p><strong>Days</strong></p></Row>
                        <Row><p>{props.courseInfo.days}</p></Row>
                    </Col>
                    <Col>
                        <Row><p><strong>Units</strong></p></Row>
                        <Row><p>{props.courseInfo.units ? props.courseInfo.units : 'TBA'}</p></Row>
                    </Col>
                    <Col>
                        <Row><p><strong>Instructor</strong></p></Row>
                        <Row><p>{props.courseInfo.instructor}</p></Row>
                    </Col>
                    <Col>
                        <Row><p><strong>Prerequisites</strong></p></Row>
                        <Row>
                            <Col>
                                {props.courseInfo.prerequisites.length > 0 ?
                                    props.courseInfo.prerequisites.map((c) => (
                                        <Badge bg="warning" text="dark">
                                            {c}
                                        </Badge>
                                    ))
                                    :
                                    <p>-</p>
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <Button variant="secondary">Details</Button>{' '}
                            <Button variant="success" onClick={props.onCourseAdd}>Add</Button>{' '}
                        </div>
                    </Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
    );
}

export default SearchItem;