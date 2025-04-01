import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./features/articlesSlice";

export const store = configureStore({
	reducer: {
		articles: articlesReducer,
	},
});
