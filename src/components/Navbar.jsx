import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";
import SearchBar from "./SearchBar";

function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};
	const { isAuthenticated, username } = useSelector((state) => state.auth);
	return (
		<>
			<nav className='navbar navbar-expand-lg px-5 pt-3'>
				<div className='container-fluid'>
					<div className='d-flex align-items-end'>
						<NavLink className='navbar-brand' to='/'>
							Blog
						</NavLink>
						{isAuthenticated && <p className='text-center'>Welcome,{username}</p>}
					</div>
					<div className='d-flex'>
						<SearchBar />
						{isAuthenticated ? (
							<>
								<button className='btn' onClick={() => handleLogout()}>
									Logout
								</button>
							</>
						) : (
							<ul className='navbar-nav  mb-2 mb-lg-0'>
								<li className='nav-item'>
									<NavLink className='nav-link active' to='/register'>
										Register
									</NavLink>
								</li>
								<li className='nav-item'>
									<NavLink className='nav-link active' to='/login'>
										Login
									</NavLink>
								</li>
							</ul>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
