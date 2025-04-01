import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching articles
export const fetchArticles = createAsyncThunk("articles/fetchArticles", async () => {
	const response = await fetch("http://127.0.0.1:8000/api/articles/");
	return response.json();
});

const articlesSlice = createSlice({
	name: "articles",
	initialState: {
		articles: [],
		status: "idle", // "idle" | "loading" | "succeeded" | "failed"
		error: null,
	},
	reducers: {}, // No manual reducers for now
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticles.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchArticles.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.articles = action.payload.results; // Adjust based on API response
			})
			.addCase(fetchArticles.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default articlesSlice.reducer;
