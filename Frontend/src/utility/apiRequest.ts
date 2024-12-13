import { notification } from "antd";
import useStore from "../zustand/store/store";


export interface EndpointConfig {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: Record<string, unknown>; 
  headers?: HeadersInit;
}
const apiRequest = async (config: EndpointConfig) => {
  const { url, method, data, headers } = config;
  useStore.getState().setShowLoading(true); 

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers, 
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    const responseData = await response.json();

    if (!response.ok) {
      notification.error({
        message: responseData.message || "An error occurred!",
      });
      throw new Error(responseData.message || "An error occurred!");
    }

    notification.success({
      message: responseData.message || "Operation successful!",
      duration: 1,
    });

    return responseData.results ?? true;
  } finally {
    useStore.getState().setShowLoading(false);
  }
};

export default apiRequest;
