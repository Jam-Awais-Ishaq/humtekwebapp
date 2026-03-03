import axios from "axios";

const apiProduct = axios.create({
  baseURL: import.meta.env.VITE_PRODUCT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiProduct.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiProduct;