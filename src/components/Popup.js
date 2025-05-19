import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

const Popup = ({ show, close, item }) => {
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const token = localStorage.getItem("token");
        const phoneNumber = localStorage.getItem("phoneNumber");
       await axios.post("http://localhost:3000/api/order/makeOrder", {
            quantity,
            address,
            product_id: item._id,
            phoneNumber: phoneNumber
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        alert("Order created successfully!");
        setQuantity("");
        setAddress("");
        close();
        }catch(error){
        console.error("Error while order:", error.message);
           alert(error.response.data.error);
    }
  }

 useEffect(() => {
    setQuantity("");
    setAddress("");
 }, [close])
  return (
    <div>
      <Modal show={show} onHide={close} centered>
        <Modal.Header className="d-flex" style={{justifyContent: "space-between"}}>
            <>
            <Modal.Title>Please fill the below form</Modal.Title>
           </>
           <>
           <Button variant="light" onClick={close}>
      <IoMdClose size={20} />
    </Button>
    </>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={address}
                as={"textarea"}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-center mt-3">
              <Button variant="success" className="w-100" type="submit">
                Order
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Popup;
