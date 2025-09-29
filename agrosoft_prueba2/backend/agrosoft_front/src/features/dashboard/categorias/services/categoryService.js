// src/features/dashboard/categorias/services/categoryService.js
import axios from "axios";

const API_URL = "http://localhost:4000/api/categorias"; // 👈 ajusta a tu backend

export const createCategory = async (categoria) => {
  const response = await axios.post(API_URL, categoria);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateCategory = async (id, categoria) => {
  const response = await axios.put(`${API_URL}/${id}`, categoria);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
