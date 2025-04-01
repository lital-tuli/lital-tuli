import ArticlesList from "./ArticleList";

function Home() {
	return (
		<>
			<div className='d-flex flex-column justify-content-center align-items-center gap-3 mt-5'>
				<h1>Welcome to the food news blog</h1>
				<p>Here you will find the latest news about food</p>
				<div className='d-flex gap-5'>
					<ArticlesList />
				</div>
				<button className='btn btn-primary'>show more..</button>
			</div>
		</>
	);
}

export default Home;
