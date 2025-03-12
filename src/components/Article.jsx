import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Article() {
	const { articleId } = useParams();
	const navigate = useNavigate();
	return (
		<>
			<h2>Article {articleId}</h2>
			<article>Article content here</article>
			<div className='comments'>comments here</div>
		</>
	);
}

export default Article;
