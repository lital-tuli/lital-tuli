import { Modal } from "react-bootstrap";
import EditComment from "./EditComment";

function EditCommentModal({ comment, show, handleClose }) {
	return (
		<>
			<Modal show={show} onHide={handleClose} size='lg' className='text-center' aria-labelledby='contained-modal-title-vcenter' centered>
				<Modal.Header closeButton>
					<Modal.Title id='contained-modal-title-vcenter'>Edit Comment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EditComment comment={comment} handleClose={handleClose} />
				</Modal.Body>
			</Modal>
		</>
	);
}

export default EditCommentModal;
