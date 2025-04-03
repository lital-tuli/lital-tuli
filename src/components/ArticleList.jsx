import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle, fetchFirstArticles } from "../redux/features/articlesSlice";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function ArticlesList() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { articles, status } = useSelector((state) => state.articles);
	const { userGroup } = useSelector((state) => state.auth);

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
	const handleDelete = (articleId) => {
		dispatch(deleteArticle(articleId));
	};
	const handleEdit = (articleId) => {
		navigate(`/articles/${articleId}/edit`);
	};

	return (
		<>
			{Array.isArray(articles) && articles.length > 0 ? (
				articles.map((article) => (
					<div key={article.id} className='card p-3' style={{ width: "23vw", minWidth: "250px" }}>
						<div className='d-flex justify-content-between gap-2'>
							<h2 className='text-capitalize'>{article.title}</h2>
							<p style={{ fontSize: "0.7rem" }}>
								{new Date(article.publish_date).toLocaleDateString()} {new Date(article.publish_date).toLocaleTimeString()}
							</p>
						</div>
						<p>Written By {article.author_name}</p>
						<button onClick={() => handleArticleClick(article.id)}>To the full article</button>
						{Array.isArray(userGroup) && userGroup.includes("admin") && (
							<div className='d-flex justify-content-center gap-2 mt-3'>
								<MdDelete style={{ height: "1.5rem", width: "1.5rem", cursor: "pointer" }} onClick={() => handleDelete(article.id)} />
								<FaRegEdit style={{ height: "1.5rem", width: "1.5rem", cursor: "pointer" }} onClick={() => handleEdit(article.id)} />
							</div>
						)}
					</div>
				))
			) : (
				<div>No articles available</div>
			)}
		</>
	);
}

export default ArticlesList;
