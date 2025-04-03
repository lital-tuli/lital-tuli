import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Article from "./components/Article";
import AddArticle from "./components/AddArticle";
import AddButton from "./components/AddButton";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { accessToken } from "./redux/features/authSlice";
import EditArticle from "./components/EditArticle";

function App() {
	const dispatch = useDispatch();
	const { isAuthenticated, userGroup = [] } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(accessToken());
		}
	}, [isAuthenticated, dispatch]);

	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/articles/new' element={<AddArticle />} />
					<Route path='/articles/:articleId' element={<Article />} />
					<Route path='/articles/:articleId/edit' element={<EditArticle />} />
					<Route path='*' element={<h1>Not Found</h1>} />
				</Routes>
				{isAuthenticated && (userGroup.includes("admin") || userGroup.includes("editors")) ? <AddButton /> : null}
			</Router>
		</>
	);
}

export default App;
