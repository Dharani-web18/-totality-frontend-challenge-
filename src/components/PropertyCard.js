// src/components/PropertyCard.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ id, title, description, price, image, location, bedrooms }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBookNow = () => {
    console.log("Book Now button clicked");
    console.log({ id, title, description, price, image, location, bedrooms });
    addToCart({ id, title, description, price, image, location, bedrooms });
    navigate('/cart'); // Navigate to the Cart page
  };

  return (
    <div className="property-card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p><strong>${price}</strong></p>
      <p>Location: {location}</p>
      <p>Bedrooms: {bedrooms}</p>
      <button onClick={handleBookNow}>Book Now</button>
    </div>
  );
};

export default PropertyCard;
