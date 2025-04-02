import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById } from "../services/articleServices";
import { getCommentsOfArticle } from "../services/commentsServices";

function Article() {
	const { articleId } = useParams();
	const [article, setArticle] = useState(null);
	const [comments, setComments] = useState([]);
	const [isFetched, setIsFetched] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchArticleAndHisComments = async () => {
			try {
				const response = await getArticleById(articleId);
				setArticle(response);
				const commentsResponse = await getCommentsOfArticle(articleId);
				setComments(commentsResponse);
			} catch (error) {
				console.error("Error fetching article:", error);
			} finally {
				setIsFetched(true);
			}
		};

		fetchArticleAndHisComments();
	}, [articleId]);

	return (
		<>
			{isFetched ? (
				<>
					<article>
						<h2>{article.title}</h2>
						<p>Written By {article.author_name}</p>
						<p>{article.content}</p>
						<button onClick={() => navigate(-1)}>Go Back</button>
					</article>
					<div className='comments'>comments here</div>
				</>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}

export default Article;
