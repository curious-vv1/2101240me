import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Product Detail</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{product.productName}</h2>
            <p className="text-gray-600 mb-2">Price: ${product.price}</p>
            <p className="text-gray-600 mb-2">Rating: {product.rating}</p>
            {product.discount > 0 && (
              <p className="text-green-600 mb-2">
                Discount: {product.discount}%
              </p>
            )}
            <p
              className={`text-sm font-bold ${
                product.availability === "yes"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              Availability: {product.availability}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
