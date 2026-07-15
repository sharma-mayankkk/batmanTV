import api from "./axios";

export const getVideoById = async (videoId) => {
  const response = await api.get(`/videos/${videoId}`);
  return response.data.data;
};

export const getAllVideos = async () => {
  const response = await api.get("/videos?limit=12");
  return response.data.data.docs;
};

export const uploadVideo = async (formData, onUploadProgress) => {
  const { data } = await api.post(
    "/videos/upload",
    formData,
    {
      onUploadProgress,
    }
  );

  return data.data;
};