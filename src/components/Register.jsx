import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";

function Register() {
	const formik = useFormik({
		initialValues: {
			name: "",
			username: "",
			email: "",
			password: "",
			image: {
				url: "",
				alt: "",
			},
		},
		validationSchema: yup.object({
			name: yup.string().required("Name is required").min(5, "Name must be at least 5 characters").max(256, "Name must be at most 256 characters").required("Name is required"),
			username: yup.string().required("Username is required").min(5, "Username must be at least 5 characters").max(256, "Username must be at most 256 characters").required("Username is required"),
			email: yup.string().email("Invalid Email Format").required("Email is required").min(5, "Email must be at least 5 characters"),
			password: yup
				.string()
				.required("Password is required")
				.min(9, "Password must be at least 9 characters")
				.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/, "Password must contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-"),
			image: yup.object({
				url: yup.string().url("Invalid URL Format").min(14, "URL must be at least 14 characters"),
				alt: yup.string().min(2, "Alt Text must be at least 2 characters").max(256, "Alt Text must be at most 256 characters"),
			}),
		}),
		onSubmit: async (values) => {
			try {
				console.log(values);
			} catch (error) {
				console.log(error);
			}
		},
	});
	return (
		<>
			<div className='container w-100 mt-5 p-0 pb-5'>
				<h1 className='w-100 text-center'>Register</h1>
				<form onSubmit={formik.handleSubmit} className='my-3 w-75 mx-auto'>
					<div className='row g-0'>
						<div className='form-floating mb-3 col-sm me-3'>
							<input name='username' type='text' className='form-control' id='username' placeholder='Username' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.username} />
							<label htmlFor='username'>Username</label>
							{formik.errors.username && formik.touched.username && <div className='text-danger'>{formik.errors.username}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input name='name' type='text' className='form-control' id='name' placeholder='Name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
							<label htmlFor='name'>Name</label>
							{formik.errors.name && formik.touched.name && <div className='text-danger'>{formik.errors.name}</div>}
						</div>
					</div>

					<div className='row g-0'>
						<div className='form-floating mb-3 col-sm me-3'>
							<input name='email' type='email' className='form-control' id='email' placeholder='Email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
							<label htmlFor='email'>Email</label>
							{formik.errors.email && formik.touched.email && <div className='text-danger'>{formik.errors.email}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input name='password' type='password' className='form-control' id='password' placeholder='Password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
							<label htmlFor='password'>Password</label>
							{formik.errors.password && formik.touched.password && <div className='text-danger'>{formik.errors.password}</div>}
						</div>
					</div>

					<div className='row g-0'>
						<div className='form-floating mb-3 col-sm me-3'>
							<input name='image.url' type='text' className='form-control' id='imageUrl' placeholder='Image URL' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.image.url} />
							<label htmlFor='imageUrl'>Image URL</label>
							{formik.errors.image?.url && formik.touched.image?.url && <div className='text-danger'>{formik.errors.image.url}</div>}
						</div>
						<div className='form-floating mb-3 col-sm'>
							<input name='image.alt' type='text' className='form-control' id='imageAlt' placeholder='Image Alt' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.image.alt} />
							<label htmlFor='imageAlt'>Image Alt</label>
							{formik.errors.image?.alt && formik.touched.image?.alt && <div className='text-danger'>{formik.errors.image.alt}</div>}
						</div>
					</div>

					<div className='d-flex justify-content-center'>
						<button type='submit' className='btn btn-success' disabled={!formik.isValid || !formik.dirty}>
							Register
						</button>
					</div>
				</form>
				<p className='text-center'>
					Already Registered? You Can Login <Link to='/login'>Here</Link>
				</p>
			</div>
			<p className='spacerFromFooter mt-5'></p>
		</>
	);
}

export default Register;
