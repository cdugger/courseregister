import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const TimeSlot = (props) => {
    return (
        <Col className="border" style={{ "position": "relative" }}>
            {
                props.event.length > 0 ?
                    <><Row className='event'><p className="text-white fs-7">{props.event[0].number + " " + props.event[0].title}</p></Row><Row></Row></>
                    : <><Row style={{"color": "white"}}><p>.</p></Row><Row style={{"color": "white"}}><p>.</p></Row></>
            }
        </Col>
    );
}

export default TimeSlot;