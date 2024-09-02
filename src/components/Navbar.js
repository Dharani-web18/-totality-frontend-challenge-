import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
        <li className="navbar-item"><Link to="/cart" className="navbar-link">Cart</Link></li>
        <li className="navbar-item"><Link to="/checkout" className="navbar-link">Checkout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
