import React, { useEffect, useState } from "react";
import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";

const Shop = () => {
  const dispatch = useDispatch();
  const productDetails = [
    {
      product_id: "01",
      product_name: "Laptop",
      price: 45000,
      description: "At better price",
      brand: "Dell",
    },
    {
      product_id: "02",
      product_name: "Smartphone",
      price: 25000,
      description: "At better price",
      brand: "Samsung",
    },
    {
      product_id: "03",
      product_name: "Headphones",
      price: 2000,
      description: "At better price",
      brand: "Sony",
    },
    {
      product_id: "04",
      product_name: "Smartwatch",
      price: 5000,
      description: "Stylish and functional",
      brand: "Boat",
    },
    {
      product_id: "05",
      product_name: "Tablet",
      price: 30000,
      description: "Great for entertainment",
      brand: "Lenovo",
    },
    {
      product_id: "06",
      product_name: "Camera",
      price: 60000,
      description: "Capture memories",
      brand: "Canon",
    },
    {
      product_id: "07",
      product_name: "Bluetooth Speaker",
      price: 3500,
      description: "Crystal clear sound",
      brand: "JBL",
    },
    {
      product_id: "08",
      product_name: "Gaming Mouse",
      price: 1500,
      description: "High DPI precision",
      brand: "Logitech",
    },
    {
      product_id: "09",
      product_name: "Mechanical Keyboard",
      price: 4000,
      description: "Tactile switches",
      brand: "Corsair",
    },
    {
      product_id: "10",
      product_name: "4K Monitor",
      price: 25000,
      description: "Ultra HD resolution",
      brand: "LG",
    },
    {
      product_id: "11",
      product_name: "Wireless Charger",
      price: 1200,
      description: "Fast wireless charging",
      brand: "Mi",
    },
    {
      product_id: "12",
      product_name: "External SSD",
      price: 8000,
      description: "Fast and compact storage",
      brand: "Samsung",
    }
  ];
  

  const [currentPage, setCurrentPage] = useState(1);
  const [itemAdded, setItemAdded] = useState(false);
  const itemsPerPage = 6;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentItems = productDetails.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(productDetails.length / itemsPerPage);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));  
    setItemAdded(true);
  };

  useEffect(()=> {
    setTimeout(() => {
        setItemAdded(false)
    }, 3000);
  })

  return (
    <div className="container mt-4">
      <h2>Shop</h2>
      <p>Get best products at best deals!</p>

      {itemAdded && (
        <p style={{backgroundColor: "#90EE90", width: '100%'}} className="text-center text-success">Product added to your cart!</p>
      )}

      {/* <ul>
                {productDetails.map((item, index) => (
                    <li key={index}>
                        <h3>{item.product_name}</h3>
                        <p>Price: {item.price}</p>
                        <p>Description: {item.description}</p>
                        <p>Brand: {item.brand}</p>
                    </li>
                ))}
            </ul> */}

      <Row>
        {currentItems.map((item, index) => (
          <Col md={4} key={index} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{item.product_name}</Card.Title>
                <Card.Subtitle>₹{item.price}</Card.Subtitle>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>
                  Brand: <b>{item.brand}</b>
                </Card.Text>
                <div className="d-flex justify-content-center">
                  <Button
                    className="w-75"
                    variant="success"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div>
        Items per page: <b>{itemsPerPage}</b> <br />
        Total items: <b>{productDetails.length}</b>
      </div>

      <div className="d-flex justify-content-center align-items-end">
        <Pagination>
          {[...Array(totalPages)].map((item, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default Shop;
