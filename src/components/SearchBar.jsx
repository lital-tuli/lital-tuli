import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { fetchArticleBySearch } from "../redux/features/articlesSlice";
import { useNavigate } from "react-router-dom";

function SearchBar() {
	const searchInput = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleSearch = () => {
		navigate("/");
		const searchValue = searchInput.current.value;
		dispatch(fetchArticleBySearch(searchValue));
	};
	return (
		<div className='d-flex'>
			<div className='input-group' style={{ fontSize: "0.875rem" }}>
				<span className='input-group-text' style={{ padding: "0.25rem 0.5rem" }}>
					<FaSearch />
				</span>
				<input type='text' className='form-control' ref={searchInput} onChange={handleSearch} placeholder='Search' style={{ fontSize: "0.875rem", padding: "0.25rem 0.5rem" }} />
			</div>
		</div>
	);
}

export default SearchBar;
