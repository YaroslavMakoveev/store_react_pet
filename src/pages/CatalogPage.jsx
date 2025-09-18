import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";

import NavBar from "../components/NavBar";

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTheme, setSearchTheme] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
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
                      <Card.Text>{p.price} $</Card.Text>
                      <div className="mt-auto">
                        <Button variant="primary">Go to product page</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>
          ) : (
            <>
              <h2 className="text-center mt-3">NO RESULTS</h2>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default CatalogPage;
