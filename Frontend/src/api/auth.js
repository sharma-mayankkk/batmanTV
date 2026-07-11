import axios from "./axios";

export const loginUser = async (credentials) => {
  const { data } = await axios.post("/users/login", credentials);
  return data.data;
};

export const getCurrentUser = async () => {
  const { data } = await axios.get("/users/current-user");
  return data.data;
};

export const logoutUser = async () => {
  const { data } = await axios.post("/users/logout");
  return data;
};