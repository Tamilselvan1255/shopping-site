import React, { useEffect, useState } from "react";
import {  Card, Col, Pagination, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { removeCart, updateQuantity } from "../redux/CartSlice";
import axios from "axios";

const Cart = () => {
  // const dispatch = useDispatch();
  // const cart = useSelector((state) => state.cart.items);
  const [myOrders, setMyOrders] = useState([]);

  // const totalPrice = cart.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );

  // const handleRemove = (product_id) => {
  //   dispatch(removeCart(product_id))
  // };

  // const handleQuantityChange = (product_id, quantity) => {
  //   dispatch(updateQuantity({product_id, quantity}))
  // }

  useEffect(() => {
 async function fetchProducts(){
    try{
      const phoneNumber = localStorage.getItem("phoneNumber");
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/order/viewMyOrders?phoneNumber=${phoneNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
setMyOrders(response.data.data.myOrders);
    }catch(error){
      console.error("Error while fetching orders", error.message);
    }
  };
  fetchProducts();
  }, [])
 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentItems = myOrders.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(myOrders.length / itemsPerPage);
  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {myOrders.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <Row>
          {currentItems.map((item) => (
            <Col sm={4} key={item.product_id} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{item.product_name}</Card.Title>
                  <Card.Subtitle>₹{item.products.price}</Card.Subtitle>
                  <Card.Text>{item.products.description}</Card.Text>
                  <Card.Text>
                    Brand: <b>{item.products.brand}</b>
                  </Card.Text>
                  <Card.Text>
                    Quantity:{item.quantity}
                    {/* <Button
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
                    </Button> */}
                  </Card.Text>
                  {/* <Button onClick={() => handleRemove(item.product_id)}>Remove</Button> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="d-flex justify-content-center">
        <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index + 1} active={index+1 === currentPage} onClick={()=>setCurrentPage(index+1)}>{index+ 1}</Pagination.Item>
        ))}
      </Pagination>
      </div>
    </div>
  );
};

export default Cart;
