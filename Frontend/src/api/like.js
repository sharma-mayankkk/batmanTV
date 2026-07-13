import api from "./axios";

export const toggleVideoLike = async (videoId) => {
  const response = await api.post(`/likes/toggle/video/${videoId}`);
  return response.data.data;
};