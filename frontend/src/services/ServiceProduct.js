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

export const createProduct = async (productData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_URL}/product`, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error create product: ${error.message}`);
    throw error;
  }
};

export const updateProduct = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${API_URL}/product/${id}`,
      updatedData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating product: ${error.message}`);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { message: "Product deleted successfully" };
  } catch (error) {
    console.error(`Error deleting product: ${error.message}`);
    throw error;
  }
};
