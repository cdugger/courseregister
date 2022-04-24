import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const TimeSlot = (props) => {
    return (
        <Col style={{ "position": "relative" }}>
            {
                props.event.length > 0 ?
                    <><Row className='event'>{props.event[0].number + " " + props.event[0].title}</Row><Row>.</Row></>
                    : <><Row>.</Row><Row>.</Row></>
            }
        </Col>
    );
}

export default TimeSlot;