// src/pages/PropertyDetails.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch('/properties.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const foundProperty = data.find((prop) => prop.id === id);
        setProperty(foundProperty);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="property-details">
      <img src={property.image} alt={property.title} />
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p><strong>${property.price} per night</strong></p>
      <h2>Amenities:</h2>
      <ul>
        {property.amenities.map((amenity, index) => (
          <li key={index}>{amenity}</li>
        ))}
      </ul>
      <button>Book Now</button>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default PropertyDetails;
