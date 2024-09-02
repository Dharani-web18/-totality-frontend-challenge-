import React, { useState } from 'react';
import './Checkout.css';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar'; // Import the Navbar component

const Checkout = () => {
  const { cartItems, cartTotal, removeFromCart } = useCart();
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would usually handle form submission, e.g., sending data to a server
    console.log('Submitting form with:', { contactInfo, paymentInfo });
    setIsSubmitted(true);
  };

  return (
    <div className="checkout">
      <Navbar /> {/* Navbar spans the full width of the page */}
      <div className="checkout-content"> {/* Wrap remaining content */}
        <h1>Checkout</h1>
        <div className="cart-summary">
          <h2>Your Booking Summary</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className='check'>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <h2>{item.title}</h2>
                    <p>${item.price} each</p>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
              <h2>Total: ${cartTotal}</h2>
            </div>
          )}
        </div>
        <div className="contact-info">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Contact Information</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={contactInfo.name}
                onChange={handleContactChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleContactChange}
                required
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                name="phone"
                value={contactInfo.phone}
                onChange={handleContactChange}
                required
              />
            </label>
            <h2>Payment Information</h2>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentChange}
                required
              />
            </label>
            <label>
              Expiration Date:
              <input
                type="text"
                name="expirationDate"
                value={paymentInfo.expirationDate}
                onChange={handlePaymentChange}
                required
              />
            </label>
            <label>
              CVV:
              <input
                type="text"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={handlePaymentChange}
                required
              />
            </label>
            <button type="submit">Complete Purchase</button>
          </form>
          {isSubmitted && <p>Thank you for your purchase!</p>}
        </div>
      </div>
    </div>
  );
};

export default Checkout;