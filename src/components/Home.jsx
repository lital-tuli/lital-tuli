import { useDispatch, useSelector } from "react-redux";
import ArticlesList from "./ArticleList";
import { fetchArticlesByPage } from "../redux/features/articlesSlice";
import { useEffect, useState } from "react";

function Home() {
	const [currentPage, setCurrentPage] = useState(1);
	const [hideShowMore, setHideShowMore] = useState(false);
	const { count, articles } = useSelector((state) => state.articles);
	const dispatch = useDispatch();
	const handleMoreArticle = () => {
		const nextPage = currentPage + 1;
		dispatch(fetchArticlesByPage(nextPage));
		setCurrentPage(nextPage);
	};
	useEffect(() => {
		if (articles.length >= count) {
			setHideShowMore(true);
		} else {
			setHideShowMore(false);
		}
	}, [articles]);

	return (
		<>
			<div className='w-75 m-auto d-flex flex-column justify-content-center align-items-center gap-3 mt-5'>
				<h1>Welcome to the food news blog</h1>
				<p>Here you will find the latest news about food</p>
				<div className='d-flex gap-5 flex-wrap '>
					<ArticlesList />
				</div>
				{!hideShowMore && (
					<button className='btn btn-primary my-5' onClick={handleMoreArticle}>
						show more..
					</button>
				)}
			</div>
		</>
	);
}

export default Home;
