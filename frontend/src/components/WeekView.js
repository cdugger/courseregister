import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import '../css/WeekView.css';
import { useEffect, useState } from 'react';


const DateHeader = (props) => {
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
                <Col style={{ border: '1px solid' }}>{d + ' ' + days[i]}</Col>
            ))}
        </Row>

    );
}

const TimeSlot = (props) => {
    return (
        <Col style={{ "position": "relative" }}>
            {
                props.event ?
                    <><Row className='event'>{props.event.name}</Row><Row>.</Row></>
                    : <><Row>.</Row><Row>.</Row></>
            }
        </Col>
    );
}

const WeekView = (props) => {
    const [week, setWeek] = useState(new Date());

    useEffect(() => {
        let start_date = new Date();
        start_date.setDate(start_date.getDate() - start_date.getDay()); // first Sunday of the week
        setWeek(start_date);
    }, [])

    function time_row_headings() {
        let result = [];
        for (let time = 0; time < 24; time++) {
            let abbreviation = "pm" ? time > 11 : "am";
            let heading = [<Col>{(time % 12 + 1) + abbreviation}</Col>];
            for (let day = 0; day < 7; day++) {
                let events = checkCourses(day, time + 1);
                heading.push(<TimeSlot event={events} />)
            }
            result.push(heading);
        }

        return result;
    }

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

    function checkCourses(day, time) {
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let events = [
            { "name": "CSC 127B", "days": "MonWed", "time": "8-9" },
            { "name": "ACCT 101", "days": "TueThu", "time": "14-15" },
            { "name": "ACCT 102", "days": "MonTueWedThuFri", "time": "11-12" }
        ];

        for (let course of props.courses) {
            let day_nums = [];
            for (let i = 0; i < course.days.length - 2; i += 3) {
                let a = course.days.substring(i, i + 3);
                let b = days.indexOf(a);
                day_nums.push(b);
            }

            const re = /^([0-9]{1,2})-([0-9]{1,2})$/;
            let matches = course.time.match(re);
            if ((Number.parseInt(matches[1]) === time)) {
                if (day_nums.indexOf(day) !== -1) {
                    return course;
                }
            }
        }

        return undefined;
    }

    return (
        <Container>
            <Button onClick={prevWeek}>{"<-"}</Button>
            <h1>{getMonth() + " " + week.getFullYear()}</h1>
            <Button onClick={nextWeek}>{"->"}</Button>
            <DateHeader start_date={week} />
            {time_row_headings().map(x => (
                <Row>
                    {x}
                </Row>
            ))}
        </Container>
    );
}

export default WeekView;