import axios from "axios";
import { refreshToken } from "./usersServices";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const getComment = async (commentId) => {
	try {
		const response = await axios.get(`${apiUrl}/comments/${commentId}/`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getCommentsOfArticle = async (articleId) => {
	try {
		const response = await axios.get(`${apiUrl}/article/${articleId}/comments/`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const createComment = async (comment, articleId) => {
	try {
		const token = await refreshToken();
		if (!token) {
			console.log("Token not found");
			return;
		}
		const response = await axios.post(`${apiUrl}/article/${articleId}/comments/`, comment, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data.comment;
	} catch (error) {
		console.log(error);
	}
};

export const updateComment = async (comment, commentId) => {
	try {
		const token = await refreshToken();
		if (!token) {
			console.log("Token not found");
			return;
		}
		const response = await axios.patch(`${apiUrl}/comments/${commentId}/`, comment, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteComment = async (commentId) => {
	try {
		const token = await refreshToken();
		if (!token) {
			console.log("Token not found");
			return;
		}
		const response = await axios.delete(`${apiUrl}/comments/${commentId}/`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
