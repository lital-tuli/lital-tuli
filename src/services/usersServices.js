import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const getUsers = async () => {
	try {
		const token = await refreshToken();
		if (!token) {
			console.log("Token not found");
			return;
		}
		const response = await axios.get(`${apiUrl}/users/`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getUser = async (userId) => {
	try {
		const token = await refreshToken();
		if (!token) {
			console.log("Token not found");
			return;
		}
		const response = await axios.get(`${apiUrl}/users/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const registerUser = async (user) => {
	try {
		const response = await axios.post(`${apiUrl}/register/`, user);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const loginUser = async (user) => {
	try {
		const response = await axios.post(`${apiUrl}/login/`, user);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const refreshToken = async () => {
	try {
		const refreshToken = sessionStorage.getItem("refresh_token");
		const response = await axios.post(`${apiUrl}/token/refresh/`, { refresh: refreshToken });
		return response.data.access;
	} catch (error) {
		console.log(error);
	}
};

export const updateUser = async (user, userId) => {
	try {
		const token = await refreshToken();
		if (!token) {
			console.log("Token not found");
			return;
		}
		const response = await axios.put(`${apiUrl}/users/${userId}/`, user, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteUser = async (userId) => {
	try {
		const token = await refreshToken();
		if (!token) {
			console.log("Token not found");
			return;
		}
		const response = await axios.delete(`${apiUrl}/users/${userId}/`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
