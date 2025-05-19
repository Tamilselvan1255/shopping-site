import axios from 'axios';
import { Formik } from 'formik';
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; 

const validationSchema = Yup.object({
    userName: Yup.string().required("Username is required!"),
    password: Yup.string().required("Password is required!")
});

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = async(values, typeOfUser) => {
    try{
        const response = await axios.post(`http://localhost:3000/api/user/login`, {
            ...values,
            typeOfUser
        });

        alert("Login successful");
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('phoneNumber', response.data.data.existUser.phoneNumber);
        navigate("/product")
    }catch(error){
        console.error("Error while login:", error.message);
        alert('Login failed')
    }
}


  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100'>
    <div className='container' style={{maxWidth:'900px'}}>
        <Row>
            <Col mb={6}>
                <Card>
                    <Card.Body>
                        <Formik 
                        initialValues={{
                            userName: "",
                            password: ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, {resetForm}) => {
                            handleLogin(values, "admin")
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
                            <h5 className='text-center'>Admin Login</h5>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='text' name='userName' value={values.userName} onBlur={handleBlur} onChange={handleChange} isInvalid={touched.userName && errors.userName} />
                                {touched.userName && errors.userName && (
                                    <p className='text-danger'>{errors.userName}</p>
                                )}
                            </Form.Group>

                              <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='text' name='password'  value={values.password} onBlur={handleBlur} onChange={handleChange} isInvalid={touched.password && errors.password} />
                                {touched.password && errors.password && (
                                    <p className='text-danger'>{errors.password}</p>
                                )}
                            </Form.Group>

                            <Form.Group className='mt-3'>
                                <div className='d-flex justify-content-center'>
                                    <Button type='submit' className='w-50'>Login</Button>
                                </div>
                            </Form.Group>
                        </Form>
                        )}
                        </Formik>
                    </Card.Body>
                </Card>
            </Col>
            <Col mb={6}>
                <Card>
                    <Card.Body>
                        <Formik 
                        initialValues={{
                            userName: "",
                            password: ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, {resetForm}) => {
                            handleLogin(values, "customer")
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
                            <h5 className='text-center'>Customer Login</h5>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='text' name='userName'  value={values.userName} onBlur={handleBlur} onChange={handleChange} isInvalid={touched.userName && errors.userName} />
                                {touched.userName && errors.userName && (
                                    <p className='text-danger'>{errors.userName}</p>
                                )}
                            </Form.Group>

                              <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='text' name='password'  value={values.password} onBlur={handleBlur} onChange={handleChange} isInvalid={touched.password && errors.password} />
                                {touched.password && errors.password && (
                                    <p className='text-danger'>{errors.password}</p>
                                )}
                            </Form.Group>

                            <Form.Group className='mt-3'>
                                <div className='d-flex justify-content-center'>
                                    <Button type='submit' className='w-50'>Login</Button>
                                </div>
                            </Form.Group>
                        </Form>
                        )}
                        </Formik>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
    </div>
  )
}

export default Home