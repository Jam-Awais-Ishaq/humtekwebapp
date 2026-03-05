import api from "./api";
import apiProduct from "./apiProduct";

// ========== REGISTER ==========
export const registerUser = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
}

export const forgotPassword = async (data) => {
  const response = await api.post("/api/auth/forget-password", data);
  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await api.post("/api/auth/verify-otp", data);
  return response.data;
};

export const resendOtp = async (data) => {
  const response = await api.post("/api/auth/resend-otp", data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post("/api/auth/reset-password", data);
  return response.data;
};

export const updateCompanyProfile = async (data) => {
  const response = await api.put("/api/auth/updateProfile", data);
  return response.data;
};

export const getCompanyProfile = async () => {
  const res = await api.get('/api/auth/getProfile');
  return res.data;
};

// ========== SEND EMAIL ==========
export const sendEmail = async (data) => {
  const response = await api.post("/api/email/sendEmail", data);
  return response.data;
};

export const createCustomer = async (data) => {
  const response = await apiProduct.post("/api/products/createCustomer", data);
  return response.data;
};

export const getCustomers = async () => {
  const res = await apiProduct.get("/api/products/getCustomers");
  return res.data;
};
export const deleteCustomerById = async (id) => {
  const res = await apiProduct.delete(`/api/products/deleteCustomer/${id}`);
  return res.data;
};

export const addMachine = async (data) => {
  const res = await apiProduct.post("/api/products/addMachine", data);
  return res.data;
};

export const getMachines = async () => {
  const res = await apiProduct.get("/api/products/getMachines");
  return res.data;
};