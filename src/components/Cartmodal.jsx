import { useState, useEffect } from "react";
import { Card, ListGroup, Button, Modal } from "react-bootstrap";

function CartModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [total, setTotal] = useState("");

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  useEffect(() => {
    const totalPrice = (cart) => {
      const sum = cart.reduce((total, item) => total + item.price, 0);
      setTotal(sum.toFixed(2)); // Ограничиваем до 2 знаков после запятой
    };
    totalPrice(cart);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
  }, [cart]);

  return (
    <>
      <Button variant="outline-light" onClick={handleShow}>
        Cart
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Your cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <h1 className="text-center">No items</h1>
          ) : (
            <>
              {cart.map((cartItem) => (
                <Card key={cartItem.id} className="mb-3 shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-center justify-content-between">
                      <Card.Img
                        src={cartItem.image}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "contain",
                        }}
                        className="me-3"
                      />

                      <div className="flex-grow-1">
                        <Card.Title className="mb-1">
                          {cartItem.title}
                        </Card.Title>
                        <Card.Text className="mb-0">
                          <strong>Price:</strong>{" "}
                          <span className="text-success">
                            {cartItem.price}$
                          </span>
                        </Card.Text>
                      </div>

                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(cartItem.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between align-items-center">
          <h5>
            Total price: <span className="text-success">{total}$</span>
          </h5>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CartModal;
