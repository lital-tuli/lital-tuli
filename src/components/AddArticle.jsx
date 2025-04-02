import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddArticle() {
	const navigate = useNavigate();
	const { isAuthenticated, userGroup } = useSelector((state) => state.auth);
	useEffect(() => {
		if (!isAuthenticated || !(userGroup.includes("admin") || userGroup.includes("editor"))) {
			navigate("/");
		}
	}, []);
	const formik = useFormik({
		initialValues: {
			title: "",
			content: "",
		},
		validationSchema: yup.object({
			title: yup.string().required("Title is required"),
			content: yup.string().required("Content is required"),
		}),
		onSubmit: (values) => {
			console.log(values);
		},
	});
	return (
		<>
			<div className='container mt-5 d-flex flex-column align-items-center'>
				<h1 className='mb-4'>Add Article</h1>
				<form className='w-50' onSubmit={formik.handleSubmit}>
					<div className='form-floating mb-3'>
						<input type='text' className={`form-control ${formik.touched.title && formik.errors.title ? "is-invalid" : ""}`} id='title' placeholder='Enter title' {...formik.getFieldProps("title")} />
						<label htmlFor='title'>Title</label>
						{formik.touched.title && formik.errors.title ? <div className='invalid-feedback'>{formik.errors.title}</div> : null}
					</div>
					<div className='form-floating mb-3'>
						<textarea
							className={`form-control ${formik.touched.content && formik.errors.content ? "is-invalid" : ""}`}
							id='content'
							placeholder='Enter content'
							style={{ height: "150px", resize: "none" }}
							{...formik.getFieldProps("content")}></textarea>
						<label htmlFor='content'>Content</label>
						{formik.touched.content && formik.errors.content ? <div className='invalid-feedback'>{formik.errors.content}</div> : null}
					</div>
					<div className='d-grid'>
						<button type='submit' className='btn btn-primary'>
							Add Article
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default AddArticle;
