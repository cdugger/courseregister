import Col from 'react-bootstrap/Col';
import TimeSlot from './TimeSlot';

const TimeRow = (props) => {

    const abbreviation = "pm" ? props.time >= 12 : "am";
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
            <Col>{(props.time % 13) + abbreviation}</Col>
            {
                dayAbbrevs.map((day, i) => (
                    <TimeSlot key={i} event={getEventOnDay(i)} />
                ))
            }
        </>
    );
}
// function time_row_headings() {
//     let result = [];
//     for (let time = 1; time <= 24; time++) {
//         let abbreviation = "pm" ? time >= 12 : "am";
//         let heading = [<Col>{((time % 13)) + abbreviation}</Col>];
//         for (let day = 0; day < 7; day++) {
//             let event = checkCourses(day, time);
//             heading.push(<TimeSlot event={event} />)
//         }
//         result.push(heading);
//     }

//     return result;
// }

export default TimeRow;