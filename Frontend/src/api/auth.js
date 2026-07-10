import axios from "./axios";

export const loginUser = async (credentials) => {
  const { data } = await axios.post("/users/login", credentials);
  return data.data;
};