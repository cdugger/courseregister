import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const DayRow = (props) => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dates = () => {
        let result = [];
        let curr_date = new Date(props.start_date.valueOf());
        for (let i = 0; i < days.length; i++) {
            result.push(curr_date);
            let temp_date = new Date(curr_date);
            temp_date.setDate(temp_date.getDate() + 1);
            curr_date = temp_date;
        }

        return result;
    }

    const isTodaysDate = (date) => {
        const todaysDate = new Date();
        return todaysDate.getMonth() === date.getMonth() && todaysDate.getDate() === date.getDate() && todaysDate.getYear() === date.getYear();
    }

    return (
        <Row>
            <Col md={1}></Col>
            {dates().map((d, i) => (
                <Col key={i} className="fs-5 border" style={isTodaysDate(d) ? {"backgroundColor": "#198754", "color": "white"}: {}}>
                    
                    <p><strong>{d.getDate() + " "}</strong>{days[i]}</p>
                </Col>
            ))}
        </Row>

    );
}

export default DayRow;