import Api from "./interceptors";
import { AxiosRequestConfig } from "axios";

interface ApiCallProps {
  endpoint: string;
  data?: any;
  method: "POST" | "GET" | "DELETE" | "PUT";
  responseType?: AxiosRequestConfig["responseType"];
}

export async function ApiCallFormData({
  endpoint,
  data,
  method,
  responseType,
}: ApiCallProps) {
  const ApiResponse = await Api({
    url: endpoint,
    method,
    data,
    responseType, // ✅ optional but safe
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: sessionStorage.getItem("auth_token"),
    },
  });

  return ApiResponse;
}

export async function ApiCall({
  endpoint,
  data,
  method,
  responseType,
}: ApiCallProps) {
  const ApiResponse = await Api({
    url: endpoint,
    method,
    data,
    responseType, // ✅ THIS IS THE KEY LINE
    headers: {
      "Content-Type": "application/json",
      authorization: sessionStorage.getItem("auth_token"),
    },
  });

  return ApiResponse;
}
