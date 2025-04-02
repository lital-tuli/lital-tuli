import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Article from "./components/Article";
import AddArticle from "./components/AddArticle";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddButton from "./components/AddButton";

function App() {
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
					<Route path='*' element={<h1>Not Found</h1>} />
				</Routes>
				<AddButton />
			</Router>
		</>
	);
}

export default App;
