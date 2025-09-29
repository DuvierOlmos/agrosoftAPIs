import axios from "axios";

const API_URL = "http://localhost:4000/api/descuentos"; // Ajusta al backend real

export const createDiscount = async (descuento) => {
  const response = await axios.post(API_URL, descuento);
  return response.data;
};

export const getDiscounts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateDiscount = async (id, descuento) => {
  const response = await axios.put(`${API_URL}/${id}`, descuento);
  return response.data;
};

export const deleteDiscount = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
