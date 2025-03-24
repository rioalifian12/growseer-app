import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching users: ${error.message}`);
    return [];
  }
};

export const fetchUserById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching user by ID: ${error.message}`);
    return null;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData);
    return response.data.newUser;
  } catch (error) {
    console.error(`Error registering user: ${error.message}`);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, credentials);
    const { token } = response.data;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.error(`Error logging in: ${error.message}`);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `${API_URL}/user/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    localStorage.removeItem("token");
  } catch (error) {
    console.error(`Error logging out: ${error.message}`);
    throw error;
  }
};

export const updateUser = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(`${API_URL}/user/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating user: ${error.message}`);
    throw error;
  }
};

export const updatePassword = async (id, passwordData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${API_URL}/user/password/${id}`,
      passwordData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating password: ${error.message}`);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error(`Error deleting user: ${error.message}`);
    throw error;
  }
};
