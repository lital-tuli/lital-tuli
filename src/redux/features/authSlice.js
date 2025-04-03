import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/usersServices";

export const loginUser = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
	try {
		const response = await authService.loginUser(credentials); // Send login request
		return response; // Expected to contain refresh & access tokens
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
	}
});
export const accessToken = createAsyncThunk("auth/accessToken", async (_, thunkAPI) => {
	try {
		const refreshToken = sessionStorage.getItem("refresh_token");
		if (!refreshToken) throw new Error("No refresh token found");
		const response = await authService.refreshToken(refreshToken);
		return response;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || "Token refresh failed");
	}
});

const parseJwt = (token) => {
	try {
		if (!token) return null;
		return JSON.parse(atob(token.split(".")[1]));
	} catch (e) {
		return null;
	}
};

const refreshToken = sessionStorage.getItem("refresh_token");
const initialState = {
	accessToken: null,
	refreshToken,
	userGroup: [],
	username: null,
	isAuthenticated: !!refreshToken,
	status: "idle",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.accessToken = null;
			state.refreshToken = null;
			state.userGroup = [];
			state.username = null;
			state.userId = null;
			state.isAuthenticated = false;
			sessionStorage.removeItem("refresh_token");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.fulfilled, (state, action) => {
				const { refresh, access } = action.payload;
				sessionStorage.setItem("refresh_token", refresh);
				const decodedToken = parseJwt(access);
				state.isAuthenticated = true;
				state.userGroup = decodedToken.user_group;
				state.username = decodedToken.username;
				state.userId = decodedToken.user_id;
				state.status = "succeeded";
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(accessToken.fulfilled, (state, action) => {
				const access = action.payload;
				const decodedToken = parseJwt(access);
				state.userGroup = decodedToken.groups;
				state.username = decodedToken.username;
				state.userId = decodedToken.user_id;
				state.accessToken = access;
				state.isAuthenticated = true;
				state.status = "succeeded";
			})
			.addCase(accessToken.rejected, (state) => {
				state.accessToken = null;
				state.isAuthenticated = false; // If refresh fails, log out
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
