import axios from "axios";
const apiUrl = process.env.API_URL || "http://localhost:8000/api";

export const getComment = async (commentId) => {
	try {
		const response = await axios.get(`${apiUrl}/comments/${commentId}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
export const getCommentsOfArticle = async (articleId) => {
	try {
		const response = await axios.get(`${apiUrl}/comments/article/${articleId}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const createComment = async (comment, articleId) => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.post(`${apiUrl}/article/${articleId}/comments`, comment, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateComment = async (comment, commentId) => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.patch(`${apiUrl}/comments/${commentId}`, comment, {
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
		const token = localStorage.getItem("token");
		const response = await axios.delete(`${apiUrl}/comments/${commentId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
