import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import '../css/Header.css';


const Header = () => {
    return (
        <Navbar className="py-4">
            <Container fluid>
                <Navbar.Brand className="fs-2" href="#"><span className="text-warning">University</span><span className="text-light">Access</span></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#">Home</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;