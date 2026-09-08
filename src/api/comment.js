import { comment } from "postcss";
import api from "./axiosInstance";

export const getApprovedCommentsByProduct = async (productId) => {
  try {
    const response = await api.get(
      `/comments?productId=${productId}&status=approved`,
    );
    return response.data;
  } catch (error) {
    console.error("خطا در دریافت نظرات:", error);
    throw error;
  }
};


export const likeComment = async(commentId, currentLikes) =>{
  const response = await api.patch(`/comments/${commentId}`, {likes : currentLikes + 1})
  return response
}
export const dislikeComment = async (commentId, currentDislikes) =>{
  const response = await api.patch(`/comments/${commentId}`, {dislikes : currentDislikes + 1})
  return response
}
export const postComment = async (user, product, { name, rating, text }) => {
  try {
     const response = await api.post("/comments", {
      productId: product.id,
      customerId: user?.id || null,
      name,
      rating,
      comment: text,
      status: "pending",
      createdAt: Date.now(),
      likes: 0,
      dislikes: 0,
      adminReply: null,
    });
    return response.data;
  } catch (error) {
    console.error("خطا در ارسال نظر:", error);
    throw error;
  }
};
