import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleById } from "../services/articleServices";
import CommentItem from "./CommentItem";
import { useDispatch, useSelector } from "react-redux";
import AddComment from "./AddComment";
import { fetchComments } from "../redux/features/commentSlice";

function Article() {
	const dispatch = useDispatch();
	const { articleId } = useParams();
	const [article, setArticle] = useState(null);
	const [isFetched, setIsFetched] = useState(false);
	const { isAuthenticated, userGroup } = useSelector((state) => state.auth);
	const { comments } = useSelector((state) => state.comments);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchArticleAndHisComments = async () => {
			try {
				const response = await getArticleById(articleId);
				setArticle(response);
				dispatch(fetchComments(articleId));
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
					<article className='border p-3 rounded' style={{ minHeight: "30vh" }} key={article.id}>
						<div className='article-header d-flex gap-3 justify-content-between'>
							<h2 className='text-capitalize'>{article.title}</h2>
							<div className='d-flex flex-column align-items-end'>
								<p>Written By {article.author_name}</p>
								<p style={{ fontSize: "0.8rem" }}>
									On {new Date(article.publish_date).toLocaleDateString()} {new Date(article.publish_date).toLocaleTimeString()}
								</p>
								<button className='btn btn-secondary' style={{ fontSize: "0.8rem" }} onClick={() => navigate(-1)}>
									Go Back
								</button>
							</div>
						</div>
						<p>{article.content}</p>
					</article>
					{isAuthenticated && (
						<div>
							<h4>Add Comment</h4>
							<AddComment articleId={articleId} reply_to={null} />
						</div>
					)}
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
