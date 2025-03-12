import { NavLink } from "react-router-dom";

function Navbar() {
	const userLoggedIn = false;
	return (
		<>
			<nav className='navbar navbar-expand-lg px-5'>
				<div className='container-fluid'>
					<NavLink className='navbar-brand' to='/'>
						Blog
					</NavLink>
					<button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						{userLoggedIn ? (
							<>
								<ul className='navbar-nav  mb-2 mb-lg-0'>
									<li className='nav-item'>
										<NavLink className='nav-link active' to='/profile'>
											Profile
										</NavLink>
									</li>
								</ul>
								<button className='btn text-decoration-none p-0'>Logout</button>
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
