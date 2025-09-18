import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTheme, setSearchTheme] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // CATEGORIES
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((p) => {
    const bySearch = p.title.toLowerCase().includes(searchTheme.toLowerCase());
    const byCategory =
      selectedCategory === "all" ? true : p.category === selectedCategory;
    return bySearch && byCategory;
  });

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

  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <Form className="mb-4">
          <Form.Label>Search by name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTheme}
            onChange={(e) => setSearchTheme(e.target.value)}
            className="mb-2"
          />
          <Form.Label>Search by category</Form.Label>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Form>
        <Row>
          {filteredProducts.length >= 1 ? (
            <>
              {filteredProducts.map((p) => (
                <Col key={p.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Card
                    style={{ height: "100%" }}
                    className="d-flex flex-column"
                  >
                    <Card.Img
                      variant="top"
                      src={p.image}
                      style={{ height: "200px", objectFit: "contain" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title style={{ fontSize: "1rem" }}>
                        {p.title}
                      </Card.Title>
                      <Card.Text className="text-success">
                        {p.price} $
                      </Card.Text>
                      <div className="mt-auto">
                        <Button
                          variant="primary"
                          onClick={() => navigate(`/product-page/${p.id}`)}
                        >
                          Go to product page
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>
          ) : (
            <>
              <div className="text-center mt-3">
                <h2 className="text-muted">NO RESULTS</h2>
              </div>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default CatalogPage;
