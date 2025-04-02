import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as articleService from "../../services/articleServices";

export const fetchFirstArticles = createAsyncThunk("articles/fetchArticles", async () => {
	return await articleService.getFirstArticles();
});

export const fetchArticlesByPage = createAsyncThunk("articles/fetchArticlesByPage", async (pageNum) => {
	return await articleService.getArticlesByPage(pageNum);
});

export const addNewArticle = createAsyncThunk("articles/addNewArticle", async (article, thunkAPI) => {
	const response = await articleService.createArticle(article);
	thunkAPI.dispatch(fetchFirstArticles());
	return response;
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
			state.count = action.payload.count || state.count; // Update the count
		})
		.addCase(asyncThunk.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
			console.log("Error fetching articles:", action.error.message);
		});
};

const articlesSlice = createSlice({
	name: "articles",
	initialState: {
		articles: [],
		count: 0,
		status: "idle", // "idle" | "loading" | "succeeded" | "failed"
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		handleAsyncActions(builder, fetchFirstArticles, "articles", "replace");
		handleAsyncActions(builder, fetchArticlesByPage, "articles", "append");
	},
});

export default articlesSlice.reducer;
