import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFirstArticles } from "../redux/features/articlesSlice";
import { useNavigate } from "react-router-dom";

function ArticlesList() {
	const navigate = useNavigate();
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

	const handleArticleClick = (articleId) => {
		navigate(`/articles/${articleId}`);
	};

	return (
		<>
			{Array.isArray(articles) && articles.length > 0 ? (
				articles.map((article) => (
					<div key={article.id} className='card p-3'>
						<h2>{article.title}</h2>
						<p>Written By {article.author_name}</p>
						<button onClick={() => handleArticleClick(article.id)}>To the full article</button>
					</div>
				))
			) : (
				<div>No articles available</div>
			)}
		</>
	);
}

export default ArticlesList;
