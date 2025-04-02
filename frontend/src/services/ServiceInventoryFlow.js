import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchInventoryFlows = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/flow/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching inventory flows: ${error.message}`);
    return [];
  }
};

export const fetchInventoryFlowById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/flow/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching inventory flow by ID: ${error.message}`);
    return null;
  }
};
