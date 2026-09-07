import api from "./axiosInstance";

export const getOrders = async () => {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت سفارشات:", error);
    throw error;
  }
};

export const createOrder = async (user, items) => {
  try {
    const response = await api.post("/orders", {
      customerId: user.id,
      items,
      status: "pending",
      date: Date.now(),
    });
    return response.status;
  } catch (error) {
    console.log(error, "خطا در ارسال سفارش");
    throw error;
  }
};