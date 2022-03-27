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
                    <Col><h5>{props.course}</h5></Col>
                </Row>
                <Row>
                    <Col>
                        <Row>CRN</Row>
                        <Row>{props.crn}</Row>
                    </Col>
                    <Col>
                        <Row>Meeting Times</Row>
                        <Row>{props.times}</Row>
                    </Col>
                    <Col>
                        <Row>Days</Row>
                        <Row>{props.days}</Row>
                    </Col>
                    <Col>
                        <Row>Units</Row>
                        <Row>{props.units}</Row>
                    </Col>
                    <Col>
                        <Row>Instructor</Row>
                        <Row>{props.instructor}</Row>
                    </Col>
                    <Col>
                        <Row>Prereqs</Row>
                        <Row>
                            <Col>
                                {props.prereqs.map((c) => (
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