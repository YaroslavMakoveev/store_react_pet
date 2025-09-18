import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Spinner } from "react-bootstrap";

import NavBar from "../components/NavBar";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <NavBar />
        <Container
          fluid
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <Spinner animation="border" variant="primary" />
        </Container>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <NavBar />
        <Container className="mt-4 text-center">
          <h2>Товар не найден</h2>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Назад
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <Button
          variant="secondary"
          className="mb-3"
          onClick={() => navigate(-1)}
        >
          Back to catalog
        </Button>
        <Row>
          <Col md={6} className="d-flex justify-content-center mb-3">
            <Card.Img
              src={product.image}
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </Col>
          <Col md={6}>
            <h2>{product.title}</h2>
            <h4 className="text-success">{product.price} $</h4>
            <p>{product.description}</p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <Button variant="primary">Add to cart</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
