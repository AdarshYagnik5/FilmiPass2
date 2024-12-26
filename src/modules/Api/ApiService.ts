/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = "http://localhost:8080";

const getToken = () => {
  return localStorage.getItem("token") || "";
};

const apiService = {
  get: async (endpoint: any, skipAuth = false) => {
    try {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (!skipAuth) {
        headers.Authorization = `Bearer ${getToken()}`;
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  post: async (endpoint: any, data: any, skipAuth = false) => {
    try {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (!skipAuth) {
        headers.Authorization = `Bearer ${getToken()}`;
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  put: async (endpoint: any, data: any, skipAuth = false) => {
    try {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (!skipAuth) {
        headers.Authorization = `Bearer ${getToken()}`;
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (endpoint: any, skipAuth = false) => {
    try {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (!skipAuth) {
        headers.Authorization = `Bearer ${getToken()}`;
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers,
      });
      return handleResponse(response);
    } catch (error) {
      handleError(error);
    }
  },
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Error ${response.status}: ${errorData}`);
  }
  return response.json();
};

const handleError = (error: unknown) => {
  console.error("API request failed:", (error as Error).message);
  throw error;
};

export default apiService;
