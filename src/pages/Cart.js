import React from 'react';
import './Cart.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from '../components/Navbar'; // Import the Navbar component

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCheckout = () => {
    navigate('/checkout'); // Redirect to checkout page
  };

  return (
    <div className="cart">
      <Navbar /> {/* Add the Navbar here */}
      <h1>Your Cart</h1>
      <div className='fullcart'>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className='cartcart'>
            <button onClick={handleCheckout} className="checkout-button">Proceed to Checkout</button> {/* Checkout button */}
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <img src={item.image} alt={item.title} />
                <h2>{item.title}</h2>
                <p>${item.price} each</p>
                <p>Quantity: {item.quantity}</p>
                <button className='cartbutton' onClick={() => decreaseQuantity(item.id)}>-</button>
                <button className='cartbutton' onClick={() => increaseQuantity(item.id)}>+</button>
                <button className='cartbutton' onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h2 className='total'>Total: ${cartTotal}</h2>
          
        </div>
      )}
    </div>
    </div>
  );
};

export default Cart;
