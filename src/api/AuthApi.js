import api from "./api";
import apiProduct from "./apiProduct";
//  routes for authentication
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
// routes update User profile 
export const updateCompanyProfile = async (data) => {
  const response = await api.put("/api/auth/updateProfile", data);
  return response.data;
};

export const getCompanyProfile = async () => {
  const res = await api.get('/api/auth/getProfile');
  return res.data;
};

// Route for SEND EMAIL
export const sendEmail = async (data) => {
  const response = await api.post("/api/email/sendEmail", data);
  return response.data;
};

// routes for customer
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

// route for adding Machine
export const addMachine = async (data) => {
  const res = await apiProduct.post("/api/products/addMachine", data);
  return res.data;
};

export const getMachines = async () => {
  const res = await apiProduct.get("/api/products/getMachines");
  return res.data;
};

// routes for estimate
export const createEstimate = async (data) => {
  const res = await apiProduct.post("/api/products/addEstimate", data);
  return res.data;
};

export const getEstimates = async () => {
  const res = await apiProduct.get("/api/products/getEstimates");
  return res.data;
};

export const updateEstimate = async (id, data) => {
  const res = await apiProduct.put(`/api/products/updateEstimate/${id}`, data);
  return res.data;
};

export const deleteEstimate = async (id) => {
  const res = await apiProduct.delete(`/api/products/deleteEstimate/${id}`);
  return res.data;
};


// Routes for invoices 

export const createInvoice = async (data) => {
  const res = await apiProduct.post("/api/products/addInvoice", data);
  return res.data;
};

export const getInvoices = async () => {
  const res = await apiProduct.get("/api/products/getInvoices");
  return res.data;
};

export const updateInvoice = async (id, data) => {
  const res = await apiProduct.put(`/api/products/updateInvoice/${id}`, data);
  return res.data;
};

export const deleteInvoice = async (id) => {
  const res = await apiProduct.delete(`/api/products/deleteInvoice/${id}`);
  return res.data;
};
// Dashboard Routes
export const getDashboardStats = async () => {
  const res = await apiProduct.get("/api/dashboard/stats");
  return res.data;
};