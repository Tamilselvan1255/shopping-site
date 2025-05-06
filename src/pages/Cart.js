import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeCart, updateQuantity } from "../redux/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemove = (product_id) => {
    dispatch(removeCart(product_id))
  };

  const handleQuantityChange = (product_id, quantity) => {
    dispatch(updateQuantity({product_id, quantity}))
  }
  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <Row>
          {cart.map((item) => (
            <Col sm={4} key={item.product_id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{item.product_name}</Card.Title>
                  <Card.Subtitle>₹{item.price}</Card.Subtitle>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>
                    Brand: <b>{item.brand}</b>
                  </Card.Text>
                  <Card.Text>
                    Quantity:{" "}
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        handleQuantityChange(
                          item.product_id,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>{" "}
                    {item.quantity}{" "}
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        handleQuantityChange(
                          item.product_id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </Button>
                  </Card.Text>
                  <Button onClick={() => handleRemove(item.product_id)}>Remove</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <h5 className="mt-3">Total price: ₹{totalPrice}</h5>
    </div>
  );
};

export default Cart;
