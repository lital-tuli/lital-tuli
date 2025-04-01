import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as articleService from "../../services/articleServices";

export const fetchFirstArticles = createAsyncThunk("articles/fetchArticles", async () => {
	return await articleService.getFirstArticles();
});

export const fetchArticlesByPage = createAsyncThunk("articles/fetchArticlesByPage", async (pageNum) => {
	return await articleService.getArticlesByPage(pageNum);
});

export const addNewArticle = createAsyncThunk("articles/addNewArticle", async (article) => {
	return await articleService.createArticle(article);
});

const handleAsyncActions = (builder, asyncThunk, key, actionType = "replace") => {
	builder
		.addCase(asyncThunk.pending, (state) => {
			state.status = "loading";
		})
		.addCase(asyncThunk.fulfilled, (state, action) => {
			state.status = "succeeded";
			if (actionType === "append") {
				state[key] = [...state[key], ...(action.payload.results || action.payload)];
			} else if (actionType === "prepend") {
				state[key] = [action.payload.results || action.payload, ...state[key]];
			} else if (actionType === "replace") {
				state[key] = action.payload.results || action.payload;
			}
		})
		.addCase(asyncThunk.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
};

const articlesSlice = createSlice({
	name: "articles",
	initialState: {
		articles: [],
		status: "idle", // "idle" | "loading" | "succeeded" | "failed"
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		handleAsyncActions(builder, fetchFirstArticles, "articles", "replace");
		handleAsyncActions(builder, fetchArticlesByPage, "articles", "append");
		handleAsyncActions(builder, addNewArticle, "articles", "prepend");
	},
});

export default articlesSlice.reducer;
