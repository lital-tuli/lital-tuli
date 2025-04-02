import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./features/articlesSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		articles: articlesReducer,
	},
});
