import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const SearchItem = (props) => {
    return (
        <ListGroup>
            <ListGroup.Item className="m-3">
                <Row>
                    <Col><h5>{props.courseInfo.title}</h5></Col>
                </Row>
                <Row>
                    <Col>
                        <Row>CRN</Row>
                        <Row>{2001}</Row>
                    </Col>
                    <Col>
                        <Row>Meeting Times</Row>
                        <Row>10:00 AM 10:30 AM</Row>
                    </Col>
                    <Col>
                        <Row>Days</Row>
                        <Row>MonWed</Row>
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
                        <Button variant="success">Add</Button>{' '}
                    </Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
    );
}

export default SearchItem;