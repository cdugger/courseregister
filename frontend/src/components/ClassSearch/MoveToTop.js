import { useEffect, useState } from 'react';
import '../../css/MoveToTop.css'
import Button from 'react-bootstrap/Button';

const MoveToTop = (props) => {
    const [show, setShow] = useState(false);

    const scrollToTop = () => {
        props.element.scrollTo({ top: 0, 'behavior': 'smooth' });
    }

    const handleScroll = () => {
        if (props.element.scrollTop > 300) {
            setShow(true)
        } else {
            setShow(false);
        }
    }

    useEffect(() => {
        props.element.addEventListener("scroll", handleScroll);

        return () => {
            props.element.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <div className="fixed-bottom text-center">
            {show ?
                <Button variant="primary" onClick={scrollToTop}>
                    <i className="bi bi-arrow-bar-up fs-2"></i>
                </Button>
                :
                <></>
            }

        </div>

    );
}

export default MoveToTop;