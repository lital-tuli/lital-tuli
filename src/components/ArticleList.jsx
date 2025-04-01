import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFirstArticles } from "../redux/features/articlesSlice";

function ArticlesList() {
	const dispatch = useDispatch();
	const { articles, status } = useSelector((state) => state.articles);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchFirstArticles()); // Fetch only if the status is idle (first load)
		}
	}, [status, dispatch]);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "failed") {
		return <div>Error fetching articles</div>;
	}

	return (
		<>
			{Array.isArray(articles) && articles.length > 0 ? (
				articles.map((article) => (
					<div key={article.id} className='card p-3'>
						<h2>{article.title}</h2>
						<p>{article.content}</p>
						<button>To the full article</button>
					</div>
				))
			) : (
				<div>No articles available</div>
			)}
		</>
	);
}

export default ArticlesList;
