import axios from "axios";

export const getUsers = async () => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.get("http://localhost:8000/api/users", {
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
		const token = localStorage.getItem("token");
		const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
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
		const response = await axios.post("http://localhost:3001/api/users/register", user);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const loginUser = async (user) => {
	try {
		const response = await axios.post("http://localhost:8000/api/users/login", user);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateUser = async (user, userId) => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.put(`http://localhost:8000/api/users/${userId}`, user, {
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
		const token = localStorage.getItem("token");
		const response = await axios.delete(`http://localhost:8000/api/users/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
