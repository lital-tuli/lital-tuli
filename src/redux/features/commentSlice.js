import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as commentService from "../../services/commentServices";

export const fetchComments = createAsyncThunk("comments/fetchComments", async (articleId) => {
	return await commentService.getCommentsOfArticle(articleId);
});
export const addNewComment = createAsyncThunk("comments/addNewComment", async ({ comment, articleId }, thunkAPI) => {
	const response = await commentService.createComment(comment, articleId);
	thunkAPI.dispatch(fetchComments(articleId));
	return response;
});
export const editComment = createAsyncThunk("comments/editComment", async ({ comment, commentId, articleId }, thunkAPI) => {
	const response = await commentService.updateComment(comment, commentId);
	thunkAPI.dispatch(fetchComments(articleId));
	return response;
});
export const deleteComment = createAsyncThunk("comments/deleteComment", async ({ commentId, articleId }, thunkAPI) => {
	const response = await commentService.deleteComment(commentId);
	thunkAPI.dispatch(fetchComments(articleId));
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
			} else if (actionType === "delete") {
				state[key] = state[key].filter((comment) => comment.id !== action.payload.id);
			}
		})
		.addCase(asyncThunk.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
			console.log("Error fetching articles:", action.error.message);
		});
};

const commentsSlice = createSlice({
	name: "comments",
	initialState: {
		comments: [],
		status: "idle", // "idle" | "loading" | "succeeded" | "failed"
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		handleAsyncActions(builder, fetchComments, "comments", "replace");
	},
});

export default commentsSlice.reducer;
