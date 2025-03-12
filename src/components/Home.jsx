function Home() {
	let articles = [
		{
			id: 1,
			title: "The best food in the world",
			content: "This is the best food in the world",
		},
		{
			id: 2,
			title: "The worst food in the world",
			content: "This is the best food in the world",
		},
		{
			id: 3,
			title: "The best food in the world",
			content: "This is the best food in the world",
		},
	];
	return (
		<>
			<div className='d-flex flex-column justify-content-center align-items-center gap-3 mt-5'>
				<h1>Welcome to the food news blog</h1>
				<p>Here you will find the latest news about food</p>
				<div className='d-flex gap-5'>
					{articles.map((article) => (
						<div key={article.id} className='card p-3'>
							<h2>{article.title}</h2>
							<p>{article.content}</p>
							<button>To the full article</button>
						</div>
					))}
				</div>
				<button className='btn btn-primary'>show more..</button>
			</div>
		</>
	);
}

export default Home;
