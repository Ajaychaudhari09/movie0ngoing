// moviedetails.js

document.addEventListener('DOMContentLoaded', function () {
    // Extract movie title from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');

    // Check if the movie is already saved locally
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    const savedMovie = savedMovies.find(movie => movie.Title === movieTitle);

    if (savedMovie) {
        // Movie is already saved, display details
        displayMovieDetails(savedMovie);
    } else {
        // Movie not saved, make API request to get details
        const apiUrl = `http://www.omdbapi.com/?t=&plot=full&apikey=cf423da3&t=${movieTitle}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayMovieDetails(data);

                // Save the new movie data locally
                saveToLocalStorage(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }
});

function displayMovieDetails(movie) {
    const detailsDiv = document.getElementById('movieDetails');
    detailsDiv.innerHTML = `
        <div class="info">
            <img src="${movie.Poster}" class="poster">
            <div>
                <h3>${movie.Title}</h3>
                <div class="details">
                    <p><strong>Plot:</strong> ${movie.Plot}</p>
                    <p><strong>Year:</strong> ${movie.Year}</p>
                    <p><strong>Rated:</strong> ${movie.Rated}</p>
                    <p><strong>Genre:</strong> ${movie.Genre}</p>
                    <p><strong>Actors:</strong> ${movie.Actors}</p>
                    <p><strong>Type:</strong> ${movie.Type}</p>
                    <p><strong>Released:</strong> ${movie.Released}</p>
                </div>
            </div>
        </div>
    `;
}

function saveToLocalStorage(movieData) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    const existingMovie = savedMovies.find(movie => movie.Title === movieData.Title);

    if (!existingMovie) {
        savedMovies.push(movieData);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }
}
