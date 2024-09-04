import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import Navbar from '../components/Navbar'; // Import the Navbar component
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: 0,
    maxPrice: 1000,
    minBedrooms: 1,
    maxBedrooms: 10,
    amenities: []
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/properties.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = properties
        .filter(prop => prop.price >= filters.minPrice && prop.price <= filters.maxPrice)
        .filter(prop => prop.bedrooms >= filters.minBedrooms && prop.bedrooms <= filters.maxBedrooms)
        .filter(prop => !filters.location || prop.location.toLowerCase().includes(filters.location.toLowerCase())); // Updated to handle partial matches
        
      setFilteredProperties(filtered);
    };

    applyFilters();
  }, [filters, properties]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? (checked ? [...prevFilters[name], value] : prevFilters[name].filter(item => item !== value)) : value
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      <Navbar /> 
     
      <div className="filters">
       
        <label>
          Location:
          <input type="text" name="location" value={filters.location} onChange={handleFilterChange} />
        </label>
        <label>
          Price Range:
          <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
          <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
        </label>
        <label>
          Number of Bedrooms:
          <input type="number" name="minBedrooms" value={filters.minBedrooms} onChange={handleFilterChange} />
          <input type="number" name="maxBedrooms" value={filters.maxBedrooms} onChange={handleFilterChange} />
        </label>
      </div>

      <div className="property-list">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id} // Include the id prop
              title={property.title}
              description={property.description}
              price={property.price}
              image={property.image}
              location={property.location}
              bedrooms={property.bedrooms}
            />
          ))
        ) : (
          <p>No properties available.</p>
        )}
      </div>
    </main>
  );
};

export default Home;
