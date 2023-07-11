import { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import LoginContext from "../../Context/LoginContext";


const NavBar = props =>{

    const loginCtx = useContext(LoginContext)

    return <Navbar fixed="top"
    bg="dark"
    expand="lg"
    variant="dark"
    style={{ fontFamily: "didot", fontSize: "1.5rem", fontColor: "white" }}>
        <Container fluid>
        <Navbar.Brand><Button variant="dark">Welcome To Expense Tracker</Button></Navbar.Brand>

        <LinkContainer to="/Profile">
            <Nav.Link className="ms-5">
              <Button variant="light">{'!!!!!!Complete the Profile'}</Button>
            </Nav.Link>
          </LinkContainer>
        </Container>

    </Navbar>
}

export default NavBar