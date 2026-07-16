import api from "./axiosInstance";

export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);
    throw error;
  }
};