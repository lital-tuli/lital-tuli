import { useState } from "react";
import { useSelector } from "react-redux";
import AddComment from "./AddComment";

function CommentItem({ comment, depth = 0 }) {
	const [showRepling, setShowReplying] = useState(false);
	const { isAuthenticated, userGroup } = useSelector((state) => state.auth);
	const handleReply = () => {
		setShowReplying((prev) => !prev);
	};
	return (
		<div className='comment p-2' style={{ marginLeft: `${depth * 40}px` }}>
			<div className='d-flex gap-3 align-items-center mb-0'>
				<p className='fw-bold text-primary' style={{ fontSize: "1rem" }}>
					{comment.author_name}
				</p>
				<p className='text-secondary' style={{ fontSize: "0.8rem" }}>
					{new Date(comment.publish_date).toLocaleDateString()} {new Date(comment.publish_date).toLocaleTimeString()}
				</p>
			</div>
			<p className='mb-1'>{comment.content}</p>
			{isAuthenticated && (
				<>
					<button className='btn text-secondary btn-sm' onClick={handleReply}>
						reply
					</button>
					{showRepling && <AddComment articleId={comment.article} reply_to={comment.id} />}
				</>
			)}

			{Array.isArray(comment.replies) && comment.replies.length > 0 && (
				<div className='replies'>
					{comment.replies.map((reply) => (
						<CommentItem key={reply.id} comment={reply} depth={depth + 1} />
					))}
				</div>
			)}
		</div>
	);
}

export default CommentItem;
