import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchRole = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.role;
  } catch (error) {
    console.log(`Error fetching role: ${error}`);
    return [];
  }
};

export const fetchRoleById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.role;
  } catch (error) {
    console.log(`Error fetching role by id: ${error}`);
    return [];
  }
};

export const addRole = async (role) => {
  try {
    const response = await axios.post(API_URL, role);
    return response.data.role;
  } catch (error) {
    console.log(`Error adding role: ${error}`);
    throw error;
  }
};

export const editRole = async (role) => {
  try {
    const response = await axios.put(`${API_URL}/${role.id}`, role);
    return response.data;
  } catch (error) {
    console.log(`Error editing role by id: ${error}`);
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.log(`Error deleting role: ${error}`);
    return null;
  }
};
