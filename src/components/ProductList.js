import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    company: '',
    minRating: '',
    availability: '',
    minDiscount: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = () => {
    let filteredProducts = products;

   
    if (filters.company !== '') {
      filteredProducts = filteredProducts.filter(product => product.company.toLowerCase().includes(filters.company.toLowerCase()));
    }

   
    if (filters.minRating !== '') {
      filteredProducts = filteredProducts.filter(product => product.rating >= parseFloat(filters.minRating));
    }

  
    if (filters.availability !== '') {
      filteredProducts = filteredProducts.filter(product => product.availability === filters.availability);
    }

  
    if (filters.minDiscount !== '') {
      filteredProducts = filteredProducts.filter(product => product.discount >= parseInt(filters.minDiscount));
    }


    if (filters.minPrice !== '') {
      filteredProducts = filteredProducts.filter(product => product.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice !== '') {
      filteredProducts = filteredProducts.filter(product => product.price <= parseInt(filters.maxPrice));
    }

    return filteredProducts;
  };

  const handleFilter = () => {
    setProducts(filterProducts());
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={filters.company}
          onChange={handleInputChange}
          className="mr-2 px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
          type="number"
          name="minRating"
          placeholder="Min Rating"
          value={filters.minRating}
          onChange={handleInputChange}
          className="mr-2 px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <select
          name="availability"
          value={filters.availability}
          onChange={handleInputChange}
          className="mr-2 px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        >
          <option value="">Select Availability</option>
          <option value="yes">Available</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
        <input
          type="number"
          name="minDiscount"
          placeholder="Min Discount"
          value={filters.minDiscount}
          onChange={handleInputChange}
          className="mr-2 px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleInputChange}
          className="mr-2 px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleInputChange}
          className="mr-2 px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        <button onClick={handleFilter} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Filter</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       
        {filterProducts().map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
          <div
            key={product.productName}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{product.productName}</h2>
              <p className="text-gray-600 mb-2">Company: {product.company}</p> {/* Added company here */}
              <p className="text-gray-600 mb-2">Price: ${product.price}</p>
              <p className="text-gray-600 mb-2">Rating: {product.rating}</p>
              {product.discount > 0 && (
                <p className="text-green-600 mb-2">
                  Discount: {product.discount}%
                </p>
              )}
              <p
                className={`text-sm font-bold ${
                  product.availability === 'yes'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                Availability: {product.availability}
              </p>
            </div>
          </div>
          </Link>
        ))}
      
      </div>
    </div>
  );
};

export default ProductList;
