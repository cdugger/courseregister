import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import '../../css/WeekView.css';
import { useEffect, useState } from 'react';
import DayRow from './DayRow';
import TimeRow from './TimeRow';

const WeekView = (props) => {
    const [week, setWeek] = useState(new Date());

    useEffect(() => {
        let start_date = new Date();
        start_date.setDate(start_date.getDate() - start_date.getDay()); // first Sunday of the week
        setWeek(start_date);
    }, [])

    function nextWeek() {
        let next_sunday = new Date(week.valueOf());
        next_sunday.setDate(next_sunday.getDate() + 7);
        setWeek(next_sunday);
    }

    function prevWeek() {
        let prev_sunday = new Date(week.valueOf());
        prev_sunday.setDate(prev_sunday.getDate() - 7);
        setWeek(prev_sunday);
    }

    function getMonth() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return months[week.getMonth()];
    }

    const TimeRows = () => {
        function createTimeRows() {
            let result = [];
            for (let hour = 1; hour <= 24; hour++) {
                let coursesAtHour = props.courses.filter(course => {
                    let startTime = course.timeStart;
                    let startHour = startTime.substring(0, startTime.indexOf(":"));
                    return startHour == hour;
                })
                result.push(<TimeRow time={hour} courses={coursesAtHour} />);
            }

            return result;
        }

        return (
            <>
                {createTimeRows().map((x, i) => (
                    <Row key={i}>{x}</Row>
                ))}
            </>
        )
    }

    return (
        <Container id="week-view">
            <Row className="text-white" style={{"backgroundColor": "#212121", "opacity": ".85"}}>
                <Col className="d-flex justify-content-end">
                    <Button className="m-1" variant="outline-info" size="lg" onClick={prevWeek}><i className="bi bi-caret-left"></i></Button>
                    <Button className="m-1" variant="outline-info" size="lg" onClick={nextWeek}><i className="bi bi-caret-right"></i></Button>
                </Col>
                <Col md={7}>
                    <h1 className="display-5">{getMonth() + " " + week.getFullYear()}</h1>
                </Col>
            </Row>


            <DayRow start_date={week} />
            <TimeRows />
        </Container>
    );
}

export default WeekView;