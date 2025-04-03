import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddComment from "./AddComment";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { deleteComment } from "../redux/features/commentSlice";
import EditCommentModal from "./EditCommentModal";

function CommentItem({ comment, depth = 0 }) {
	const dispatch = useDispatch();
	const [isOwner, setIsOwner] = useState(false);
	const [showRepling, setShowReplying] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const { isAuthenticated, userGroup, userId } = useSelector((state) => state.auth);
	const handleReply = () => {
		setShowReplying((prev) => !prev);
	};
	const handleDelete = (commentId, articleId) => {
		dispatch(deleteComment({ commentId, articleId }));
	};
	useEffect(() => {
		if (comment.author === userId) {
			setIsOwner(true);
		} else {
			setIsOwner(false);
		}
	}, [userId, comment.author_id]);
	return (
		<div className='comment p-2' style={{ marginLeft: `${depth * 40}px` }}>
			<div className='d-flex gap-3 align-items-center mb-0'>
				<p className='fw-bold text-primary' style={{ fontSize: "1rem" }}>
					{comment.author_name}
				</p>
				<p className='text-secondary' style={{ fontSize: "0.8rem" }}>
					{new Date(comment.publish_date).toLocaleDateString()} {new Date(comment.publish_date).toLocaleTimeString()}
				</p>
				{Array.isArray(userGroup) && userGroup.includes("admin") && <MdDelete className='align-self-start pt-1' style={{ cursor: "pointer", height: "1.1rem", width: "1.1rem" }} onClick={() => handleDelete(comment.id, comment.article)} />}
				{isOwner && <MdModeEdit className='align-self-start pt-1' style={{ cursor: "pointer", height: "1.1rem", width: "1.1rem" }} onClick={() => setShowEditModal(true)} />}
			</div>
			<p className='mb-1'>{comment.content}</p>
			{isAuthenticated && (
				<>
					<button className='btn text-secondary btn-sm' onClick={handleReply}>
						reply
					</button>
					{showRepling && <AddComment articleId={comment.article} reply_to={comment.id} setShowReplying={setShowReplying} />}
				</>
			)}

			{Array.isArray(comment.replies) && comment.replies.length > 0 && (
				<div className='replies'>
					{comment.replies.map((reply) => (
						<CommentItem key={reply.id} comment={reply} depth={depth + 1} />
					))}
				</div>
			)}
			<EditCommentModal comment={comment} show={showEditModal} handleClose={() => setShowEditModal(false)} />
		</div>
	);
}

export default CommentItem;
