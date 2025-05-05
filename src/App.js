import './App.css';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import Shop from './Shop';
import Contact from './Contact';
import About from './About';
import Cart from './Cart';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="/shop" >Shop</Link></li>
            <li><Link to="/about" >About</Link></li>
            <li><Link to="/contact" >Contact</Link></li>
            <li><Link to="/cart" className='mini-cart'>
              <span><FaCartShopping /></span>
            </Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path='/' element={
            <>
              <h1>Home page</h1>
              <p>Welcome to our Home page</p>
            </>
          } />
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
