import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const DayRow = (props) => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dates = () => {
        let result = [];
        let curr_date = new Date(props.start_date.valueOf());
        for (let i = 0; i < days.length; i++) {
            result.push(curr_date.getDate());
            curr_date.setDate(curr_date.getDate() + 1);
        }

        return result;
    }

    return (
        <Row>
            <Col></Col>
            {dates().map((d, i) => (
                <Col key={i} style={{ border: '1px solid' }}>{d + ' ' + days[i]}</Col>
            ))}
        </Row>

    );
}

export default DayRow;