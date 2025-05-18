import React, { useEffect, useState } from "react";
import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import axios from "axios";

const Shop = () => {
  const dispatch = useDispatch();
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts(){
      try{
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://shopping-site-be.onrender.com/api/product/viewProducts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data.data.products);
      }catch(error){
         console.error("Error fetching products", error);
      }
    }
    fetchProducts();
  }, [])
  

  const [currentPage, setCurrentPage] = useState(1);
  const [itemAdded, setItemAdded] = useState(false);
  const itemsPerPage = 6;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentItems = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

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
        Total items: <b>{products.length}</b>
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
