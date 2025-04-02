import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById } from "../services/articleServices";
import { getCommentsOfArticle } from "../services/commentsServices";
import CommentItem from "./CommentItem";

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
				<div className='container mt-3 d-flex flex-column gap-5'>
					<article className='border p-3 rounded' style={{ minHeight: "30vh" }}>
						<div className='article-header d-flex gap-3 justify-content-between'>
							<h2>{article.title}</h2>
							<div className='d-flex flex-column align-items-end'>
								<p>Written By {article.author_name}</p>
								<button className='btn btn-secondary' style={{ fontSize: "0.8rem" }} onClick={() => navigate(-1)}>
									Go Back
								</button>
							</div>
						</div>
						<p>{article.content}</p>
					</article>
					<form action=''>
						<h4>Add Comment</h4>
						<div className='mb-3'>
							<label htmlFor='comment' className='form-label'></label>
							<textarea className='form-control' id='comment' rows={3} placeholder='Write your comment here...'></textarea>
						</div>
						<button type='submit' className='btn btn-primary'>
							Submit
						</button>
					</form>
					<div className='comments p-3 rounded'>
						<h4>Comments</h4>
						{comments.length > 0 ? comments.map((comment) => <CommentItem key={comment.id} comment={comment} />) : <p>No comments available</p>}
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}

export default Article;
