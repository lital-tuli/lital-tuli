import { useNavigate } from "react-router-dom";

function AddButton() {
	const navigate = useNavigate();

	return (
		<button
			className='btn btn-success position-fixed shadow rounded-circle'
			style={{
				bottom: "20px",
				right: "20px",
				width: "50px",
				height: "50px",
				fontSize: "18px",
			}}
			onClick={() => navigate("/articles/new")}>
			+
		</button>
	);
}

export default AddButton;
