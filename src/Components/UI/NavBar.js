import { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoginContext from "../../Context/LoginContext";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const loginCtx = useContext(LoginContext);

  const navigate = useNavigate();

  return (
    <Navbar
      fixed="top"
      bg="dark"
      expand="lg"
      variant="dark"
      style={{
        position: "sticky",
        fontFamily: "didot",
        fontSize: "1.5rem",
        fontColor: "white",
      }}
    >
      <Container fluid>
        <Navbar.Brand>
          <Button variant="dark" onClick={() => navigate("/")}>
            <h4>Welcome To Expense Tracker</h4>
          </Button>
        </Navbar.Brand>
        {loginCtx.loggedin && (
          <LinkContainer to="/Profile">
            <Nav.Link className="ms-5">
              <Button variant="light">
                {loginCtx.profile
                  ? "Your Profile  is 100%"
                  : "Your Profile is incolplete. Complete Now"}
              </Button>
              {loginCtx.loggedin && (
                <Button
                  variant="danger"
                  className="pull-right m-2"
                  style={{ textAlign: "right" }}
                  onClick={loginCtx.logout}
                >
                  logout
                </Button>
              )}
            </Nav.Link>
          </LinkContainer>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
