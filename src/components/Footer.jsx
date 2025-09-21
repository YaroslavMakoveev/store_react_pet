import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      className="bg-dark d-flex align-items-center mt-5"
      style={{ height: "80px" }}
    >
      <Container className="text-center">
        <h5 className="text-white-50 mb-0" style={{ fontSize: "14px" }}>
          Pet-project by Makoveev
        </h5>
      </Container>
    </footer>
  );
};

export default Footer;
