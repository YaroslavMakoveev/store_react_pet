import { Button, Navbar, Container } from "react-bootstrap";
import CartModal from "./Cartmodal";

function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Fake Store API</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <CartModal />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
