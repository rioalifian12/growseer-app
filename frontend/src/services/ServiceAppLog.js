import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAppLogs = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/log`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching logs:", error.message);
    return [];
  }
};

export const fetchAppLogById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/log/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching log by ID: ${error.message}`);
    return null;
  }
};
