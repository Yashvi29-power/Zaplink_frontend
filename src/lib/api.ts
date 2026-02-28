import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "",
    withCredentials: true,
});

// Request interceptor (optional future enhancement)
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any>) => {
        const status = error.response?.status;

        let message = "Something went wrong. Please try again.";

        if (status === 401) {
            message = "Session expired. Please login again.";
            window.location.href = "/login";
        } else if (status === 403) {
            message = "You do not have permission to perform this action.";
        } else if (status === 404) {
            message = "Requested resource not found.";
        } else if (status === 500) {
            message = "Server error. Please try again later.";
        } else if (error.response?.data?.message) {
            message = error.response.data.message;
        }

        return Promise.reject({
            status,
            message,
        });
    }
);

export default api;