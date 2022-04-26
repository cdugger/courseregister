import Col from 'react-bootstrap/Col';
import TimeSlot from './TimeSlot';

const TimeRow = (props) => {

    const abbreviation = props.time >= 12  ? "pm" : "am";
    const dayAbbrevs = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function getEventOnDay(targetDay) {
        return props.courses.filter(course => {
            let meetingDays = []; // the days the course meets at 0="Sun" 6="Sat"
            for (let i = 0; i < course.days.length - 2; i += 3) {
                let dayName = course.days.substring(i, i + 3);
                let dayNumber = dayAbbrevs.indexOf(dayName);
                meetingDays.push(dayNumber);
            }

            return meetingDays.indexOf(targetDay) !== -1;
        })
    }

    return (
        <>
            <Col className="mt-4" md={1}><p >{(props.time % 13) + " " + abbreviation}</p></Col>
            {
                dayAbbrevs.map((day, i) => (
                    <TimeSlot key={i} event={getEventOnDay(i)} />
                ))
            }
        </>
    );
}

export default TimeRow;