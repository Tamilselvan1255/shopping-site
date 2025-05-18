import './App.css';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import About from './pages/About';
import Cart from './pages/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Product from './pages/Product';

function App() {
  const cart = useSelector((state) => state.cart.items)
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="/shop" >Shop</Link></li>
            <li><Link to="/product" >Product</Link></li>
            <li><Link to="/about" >About</Link></li>
            <li><Link to="/contact" >Contact</Link></li>
            <li><Link to="/cart" className='mini-cart'>
              <span><FaCartShopping />{
                cart.length > 0 && (
                  <span  style={{
                    color: 'white',
                    borderColor: "red",
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '12px',
                  }}>({cart.length})</span>
                )
              }</span>
            </Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
