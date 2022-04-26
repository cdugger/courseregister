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
            <Col md={1}></Col>
            {dates().map((d, i) => (
                <Col key={i} className="fs-5 border"><p><strong>{d + " "}</strong>{days[i]}</p></Col>
            ))}
        </Row>

    );
}

export default DayRow;