import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateArticle } from "../redux/features/articlesSlice";
import { getArticleById } from "../services/articleServices";

function EditArticle() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { articleId } = useParams();
	const { isAuthenticated, userGroup } = useSelector((state) => state.auth);
	useEffect(() => {
		if (!isAuthenticated || !(userGroup.includes("admin") || userGroup.includes("editor"))) {
			navigate("/");
		} else {
			const getEditedArticle = async () => {
				const response = await getArticleById(articleId);
				formik.setValues({
					title: response.title,
					content: response.content,
					tags: response.tags.length > 0 ? response.tags.join(", ") : [],
				});
			};
			getEditedArticle();
		}
	}, []);

	const formik = useFormik({
		initialValues: {
			title: "",
			content: "",
			tags: [],
		},
		validationSchema: yup.object({
			title: yup.string().required("Title is required"),
			content: yup.string().required("Content is required"),
		}),
		onSubmit: (values) => {
			if (typeof values.tags === "string") {
				values.tags = values.tags.split(",").map((tag) => tag.trim());
			}
			const response = dispatch(updateArticle({ articleId, article: values }));
			if (response) {
				navigate("/");
			}
		},
	});
	return (
		<>
			<div className='container mt-5 d-flex flex-column align-items-center'>
				<h1 className='mb-4'>Edit Article</h1>
				<form className='w-50' onSubmit={formik.handleSubmit}>
					<div className='form-floating mb-3'>
						<input
							type='text'
							className={`form-control ${formik.touched.title && formik.errors.title ? "is-invalid" : ""}`}
							id='title'
							placeholder='Enter title'
							value={formik.values.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor='title'>Enter title</label>
						{formik.touched.title && formik.errors.title ? <div className='invalid-feedback'>{formik.errors.title}</div> : null}
					</div>
					<div className='form-floating mb-3'>
						<textarea
							className={`form-control ${formik.touched.content && formik.errors.content ? "is-invalid" : ""}`}
							id='content'
							placeholder='Enter content'
							style={{ height: "150px", resize: "none" }}
							value={formik.values.content}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}></textarea>
						<label htmlFor='content'>Enter content</label>
						{formik.touched.content && formik.errors.content ? <div className='invalid-feedback'>{formik.errors.content}</div> : null}
					</div>
					<div className='form-floating mb-3'>
						<input
							type='text'
							className={`form-control ${formik.touched.tags && formik.errors.tags ? "is-invalid" : ""}`}
							id='tags'
							placeholder='Enter tags separated by commas'
							value={formik.values.tags || ""}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<label htmlFor='tags'>Enter tags separated by commas</label>
						{formik.touched.tags && formik.errors.tags ? <div className='invalid-feedback'>{formik.errors.tags}</div> : null}
					</div>
					<div className='d-grid'>
						<button type='submit' className='btn btn-primary'>
							Update Article
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default EditArticle;
