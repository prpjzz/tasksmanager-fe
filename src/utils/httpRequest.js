import axios from "axios";

const TaskManagerRequest = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api", // Fallback to localhost
	headers: {
		"Content-Type": "application/json",
	},
});

// Thêm token vào headers nếu có
TaskManagerRequest.interceptors.request.use((config) => {
	const token = localStorage.getItem("AUTH_KEY");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Xử lý lỗi toàn cục
TaskManagerRequest.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			// Token hết hạn hoặc không hợp lệ
			localStorage.removeItem("AUTH_KEY");
			window.location.href = "/login"; // Chuyển hướng về login
		}
		return Promise.reject(error);
	}
);

export const get = async (url, params = {}) => {
	const response = await TaskManagerRequest.get(url, params);
	return response;
};

export const post = async (url, data = {}) => {
	const response = await TaskManagerRequest.post(url, data);
	return response;
};

export const put = async (url, data = {}) => {
	const response = await TaskManagerRequest.put(url, data);
	return response;
};

export const del = async (url) => {
	const response = await TaskManagerRequest.delete(url);
	return response;
};

export default TaskManagerRequest;
