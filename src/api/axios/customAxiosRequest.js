// src/api/apiClient.ts
import getToken from "../../utils/getToken";
import getUserDetails from "../../utils/getUserDetails";
import axiosInstance from "./axiosInstance";
// POST request (always include userId in body)
export const customAxiosPost = async (url, data) => {
  const userId = getUserDetails()?._id;
  const token = getToken();
  const response = await axiosInstance.post(
    url,
    {
      ...data,
      userId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
// / GET request (add Bearer token + userId in query if available)
export const customAxiosGet = async (url, params = {}) => {
  const token = getToken();
  const userId = getUserDetails()?._id;

  const response = await axiosInstance.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      ...params,
      ...{ userId },
    },
  });

  return response.data;
};
