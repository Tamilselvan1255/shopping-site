



import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "./App.css"
import * as Yup from 'yup';
import { Formik } from 'formik';

const validationSchema = Yup.object({
  name: Yup.string().min(3, "Name have atleast 3 characters!").required("Name is required!"),
  phoneNumber: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits!").required("Phone number is required!"),
  email: Yup.string().email("Invalid email address!").required("Email is required!"),
})

const Contact = () => {
  const [submit, setSubmit] = useState(false);


  useEffect(() => {
    if (submit) {
      const timer = setTimeout(() => {
        setSubmit(false);
      }, 2000);

      return () => clearTimeout(timer)
    }
  }, [submit])
  const contactDetails = {
    phoneNumber: "+91 97888 25633",
    phoneNumber1: "+91 95979 01843",
    landLine: "0462 444 333",
    address: "38, Bharathiyar street, John heaven city, Melakarungulam, Tirunelveli, Tamilnadu - 627356"
  }
  return (
    <div className='container mt-5'>
      {submit && (
        <p style={{ backgroundColor: '#90EE90', width: '100%' }}
        className='text-success text-center mt-3'>Thank you! Our team will contact you shortly!</p>
      )}

      <div className='row'>
        <div className='col-lg-6'>
          <h2>Contact</h2>
          <p>If you've any queries, feel to free us</p>

          <p><b>Phone number:</b> {contactDetails.phoneNumber}</p>
          <p><b>Phone number1:</b> {contactDetails.phoneNumber1}</p>
          <p><b>Landline:</b> {contactDetails.landLine}</p>
          <p><b>Address:</b> {contactDetails.address}</p>
        </div>

        <div className='col-lg-6 border rounded p-4 shadow-sw bg-light'>
          <Formik
            initialValues={{
              name: "",
              phoneNumber: "",
              email: "",
              subject: "",
              message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
             setSubmit(true)
              console.log(values)
              resetForm()
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              touched
            }) => (
              <Form onSubmit={handleSubmit}>
                <h4 className='text-center'>Feel free to reach us!</h4>
                <Form.Group className='mb-3'>
                  <Form.Label>Name<span className='text-danger'>*</span></Form.Label>
                  <Form.Control type='text' name='name' placeholder='John doe' value={values.name} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.name && errors.name} />

                  {touched.name && errors.name && (
                    <div className='text-danger'>{errors.name}</div>
                  )}
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Phone number<span className='text-danger'>*</span></Form.Label>
                  <Form.Control type='text' inputMode='numeric' pattern='[0-9]*' name='phoneNumber' placeholder='12345 6789' value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.phoneNumber && errors.phoneNumber} />

                  {touched.phoneNumber && errors.phoneNumber && (
                    <div className='text-danger'>{errors.phoneNumber}</div>
                  )}
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Email address<span className='text-danger'>*</span></Form.Label>
                  <Form.Control type='email' name='email' placeholder='you@gmail.com' value={values.email} onChange={handleChange} onBlur={handleBlur} isInvalid={touched.email && errors.email} />

                  {touched.email && errors.email && (
                    <div className='text-danger'>{errors.email}</div>
                  )}
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type='text' name='subject' placeholder='your subject' value={values.subject} onChange={handleChange} />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Message</Form.Label>
                  <Form.Control as='textarea' name='message' value={values.message} placeholder='Please write your message in brief..' onChange={handleChange} />
                </Form.Group>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type='submit' className='w-50'>Submit</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default Contact