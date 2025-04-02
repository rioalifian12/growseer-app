import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCustomers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/user/customer`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching customers: ${error.message}`);
    return [];
  }
};
