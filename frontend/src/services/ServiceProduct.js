import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product by ID: ${error.message}`);
    return null;
  }
};
