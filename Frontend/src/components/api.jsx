import axios from 'axios';

const API_URL = 'http://localhost:4001';

export const createProduct = (product) => axios.post(`${API_URL}/product`, product);
export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProductById = (id) => axios.get(`${API_URL}/product/${id}`);
export const updateProduct = (id, updatedData) => axios.put(`${API_URL}/product/${id}`, updatedData);
export const deleteProduct = (id) => axios.delete(`${API_URL}/product/${id}`);
