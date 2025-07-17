import Api from "./interceptors";

interface ApiCallProps {
  endpoint: string;
  data?: any;
  method: "POST" | "GET" | "DELETE" | "PUT";
}

export async function ApiCallFormData({
  endpoint,
  data,
  method,
}: ApiCallProps) {
  const ApiResponse = await Api({
    url: endpoint,
    method: method,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: sessionStorage.getItem("auth_token"),
    },
  });

  return ApiResponse;
}

export async function ApiCall({ endpoint, data, method }: ApiCallProps) {
  const ApiResponse = await Api({
    url: endpoint,
    method: method,
    data: data,
    headers: {
      "Content-Type": "application/json",
      authorization: sessionStorage.getItem("auth_token"),
    },
  });

  return ApiResponse;
}
