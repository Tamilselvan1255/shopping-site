import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  Table,
  Card,
  Pagination,
} from "react-bootstrap";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";

const Product = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [products, setProducts] = useState([]);

  const [editable, setEditable] = useState(false);
  const [editableProduct, setEditableProduct] = useState(null);

  const [dynamicButton, setDynamicButton] = useState(false);
  const [newData, setNewData] = useState(false);

  const handleEdit = (item) => {
    setEditableProduct(item._id);
    setProductName(item.product_name);
    setPrice(item.price);
    setQuantity(item.quantity);
    setDescription(item.description);
    setBrand(item.brand);
    setEditable(true);
    setDynamicButton(true);
  };

  const resetForm = () => {
    setProductName("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setBrand("");
    setSelectedImages([]);
    setEditable(false);
    setEditableProduct(null);
    setDynamicButton(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);
      formData.append("brand", brand);

      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("product_images", selectedImages[i]);
      }

      if (editable) {
        await axios.patch(
          `http://localhost:3000/api/product/updateProduct/${editableProduct}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Product updated successfully");
        setProductName("");
        setPrice("");
        setQuantity("");
        setDescription("");
        setBrand("");
      } else {
        await axios.post(
          `http://localhost:3000/api/product/addProduct`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Product added successfully");
        setProductName("");
        setPrice("");
        setQuantity("");
        setDescription("");
        setBrand("");
        setSelectedImages([]);
      }
      fetchProducts();
    } catch (error) {
      console.error("Error while adding product", error.message);
      alert("Something went wrong!");
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/product/viewProducts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.data.products);
    } catch (error) {
      console.error("Error while fetching products", error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (product_id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/product/deleteProduct/${product_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product removed successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error while deleting product:", error.message);
      alert("Something went wrong");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentItems = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container mt-4 justify-content-center">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col mb={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={description}
                    as={"textarea"}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Product Images</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files);
                      setSelectedImages((prevImages) => [
                        ...prevImages,
                        ...newFiles,
                      ]);
                    }}
                  />
                </Form.Group>
                {selectedImages.length > 0 && (
                  <div className="mt-3">
                    <h6>Selected Images:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {selectedImages.map((image, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt="preview"
                          width="100"
                          height="100"
                          style={{ objectFit: "cover", borderRadius: 4 }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <Button type="submit" className="mt-3 w-100">
                  {dynamicButton ? "Submit" : "Add"}
                </Button>

                {dynamicButton && (
                  <Button
                    className="mt-3 w-100"
                    variant="secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Row>
            {currentItems.map((item, index) => (
              <Col md={4} key={index} className="mb-3">
                <Card style={{ height: "246px" }}>
                  <Card.Body>
                    <div className="d-flex justify-content-end">
                      <RiEditLine
                        onClick={() => handleEdit(item)}
                        style={{ cursor: "pointer" }}
                      />
                      <RiDeleteBinLine
                        onClick={() => handleDelete(item._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <Card.Title>{item.product_name}</Card.Title>
                    <Card.Subtitle>₹{item.price}</Card.Subtitle>
                    <Card.Text
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </Card.Text>
                    <Card.Text>
                      Brand: <b>{item.brand}</b>
                      <br />
                      Quantity: <b>{item.quantity}</b>
                    </Card.Text>
                    {item.product_images.map((image, index) => (
                      <img key={index} src={image} width="40" height="40" />
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

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
        </Col>
      </Row>
    </div>
  );
};

export default Product;
