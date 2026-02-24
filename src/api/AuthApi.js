import api from "./api";

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