import Row from 'react-bootstrap/Row';
import CourseListItem from './CourseListItem';

const CourseList = (props) => {

    return (
        <Row className="w-75 mx-auto">
            {props.courses ? props.courses.map((c, i) => (
                <CourseListItem key={i} courseInfo={c} id={i} onDrop={props.onDrop} />
            ))
                :
                <></>
            }
        </Row>
    );
};

export default CourseList;