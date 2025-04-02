import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addNewComment } from "../redux/features/commentSlice";

function AddComment({ articleId, reply_to, setShowReplying }) {
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			content: "",
			reply_to: reply_to,
		},
		validationSchema: yup.object({
			content: yup.string().required("comment is required").min(5, "comment must be at least 5 characters long").max(1000, "comment must be at most 1000 characters long"),
		}),
		onSubmit: async (values) => {
			try {
				const response = dispatch(addNewComment({ comment: values, articleId }));
				if (response) {
					formik.resetForm();
					setShowReplying(false);
				}
			} catch (error) {
				console.log(error);
			}
		},
	});
	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<div className='mb-3'>
					<label htmlFor='content' className='form-label'></label>
					<textarea
						style={{ resize: "none" }}
						className={`form-control ${formik.touched.content && formik.errors.content ? "is-invalid" : ""}`}
						id='content'
						name='content'
						rows={3}
						placeholder='Write your comment here...'
						value={formik.values.content}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}></textarea>
					{formik.touched.content && formik.errors.content ? <div className='invalid-feedback'>{formik.errors.content}</div> : null}
				</div>
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</form>
		</>
	);
}

export default AddComment;
