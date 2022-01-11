// create namespace
const movieApp = {}

const movieSearchBox = document.querySelector('#movie');
const searchList = document.querySelector('#searchList');

// initialize function
movieApp.init = () => {
	// global selector
	movieApp.findMovies()
}

// getting movies from the oMDB API
async function loadMovies(query) {
	const url = `https://omdbapi.com/?s=${query}&page=1&apikey=2610afcc`;
	const res = await fetch(`${url}`);
	const data = await res.json();
	if (data.Response === 'True') { movieApp.displayMovieList(data.Search) };
}

// search movies based on user inputted query from the searchbar
movieApp.findMovies = () => {
	let query = (movieSearchBox.value).trim();
	if (query.length > 0) {
		searchList.classList.remove('hideSearchList');
		loadMovies(query);
	} else {
		searchList.classList.add('hideSearchList');
	}
}

// display movies we receive from the API to the page
movieApp.displayMovieList = (movies) => {
	searchList.innerHTML = "";
	for (let i = 0; i < movies.length; i++) {
		let movieListItem = document.createElement('ul');
		movieListItem.dataset.id = movies[i].imdbID;
		movieListItem.classList.add('searchListItem');
		if (movies[i].Poster != "N/A")
			moviePoster = movies[i].Poster;
		else
			moviePoster = "image not found";

		movieListItem.innerHTML = `
        <li>
            <img src = "${moviePoster}">
        </li>
        <li>
            <h3>${movies[i].Title}</h3>
            <p>Released ${movies[i].Year}</p>
        </li>
        `;
		searchList.appendChild(movieListItem);
	}
}

// call init function
movieApp.init()