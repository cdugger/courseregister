import Row from 'react-bootstrap/Row';
import CourseListItem from './CourseListItem';

const CourseList = (props) => {

    return (
        <Row>
            {props.courses ? props.courses.map(c => (
                <CourseListItem courseInfo={c} />
            ))
            : 
            <></>
            }
        </Row>
    );
};

export default CourseList;