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

export const refreshToken = createAsyncThunk("auth/refreshToken", async (_, thunkAPI) => {
	try {
		const response = await authService.refreshToken(); // Call API to refresh token
		return response;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data || "Refresh failed");
	}
});

const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split(".")[1]));
	} catch (e) {
		return {};
	}
};

const refreshTokenExist = sessionStorage.getItem("refresh_token");
const initialUserGroup = refreshToken ? parseJwt(refreshTokenExist).user_group || null : null;

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: !!refreshTokenExist,
		userGroup: initialUserGroup,
		status: "idle", // "idle" | "loading" | "succeeded" | "failed"
		error: null,
	},
	reducers: {
		logout: (state) => {
			sessionStorage.removeItem("refresh_token");
			state.isAuthenticated = false;
			state.userGroup = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.fulfilled, (state, action) => {
				const { refresh, access } = action.payload;
				sessionStorage.setItem("refresh_token", refresh); // Store refresh token
				const decodedToken = parseJwt(access); // Decode JWT to extract user info
				state.isAuthenticated = true;
				state.userGroup = decodedToken.user_group;
				state.status = "succeeded";
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				const { access } = action.payload;
				const decodedToken = parseJwt(access);
				state.isAuthenticated = true;
				state.userGroup = decodedToken.user_group;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
