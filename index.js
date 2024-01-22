// index.js

document.addEventListener('DOMContentLoaded', function () {
    displayMovies();
    displaySavedMovies(0);

    // Add event listener for the search form
    document.getElementById('movieForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = document.querySelector('input[type="search"]').value;
        const apiUrl = `http://www.omdbapi.com/?t=&plot=full&apikey=cf423da3&t=${searchTerm}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = `<div class="info">
                    <img src="${data.Poster}"  class="poster">
                    <div>
                        <h3>${data.Title}</h3>
                        <div class="details">
                            <p><strong>Plot:</strong> ${data.Plot}</p>
                            <p><strong>Year:</strong> ${data.Year}</p>
                            <p><strong>Rated:</strong> ${data.Rated}</p>
                            <p><strong>Genre:</strong> ${data.Genre}</p>
                            <p><strong>Actors:</strong> ${data.Actors}</p>
                            <p><strong>Type:</strong> ${data.Type}</p>
                            <p><strong>Released:</strong> ${data.Released}</p>
                        </div>
                    </div>
                </div>`;

                // Save searched movie to local storage
                saveToLocalStorage(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    });

    // Add event listener for the next page button
    document.getElementById('nextPage').addEventListener('click', function () {
        nextPage();
    });

    // Add event listener for the previous page button
    document.getElementById('prevPage').addEventListener('click', function () {
        prevPage();
    });
});

let currentPage = 0;

// Function to display next page of saved movies
function nextPage() {
    currentPage++;
    displaySavedMovies(currentPage);
}

// Function to display previous page of saved movies
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displaySavedMovies(currentPage);
    }
}

// Function to display saved movies
function displaySavedMovies(page) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    const savedMoviesDiv = document.getElementById('savedMovies');
    savedMoviesDiv.innerHTML = '';

    const start = page * 5;
    const end = start + 5;

    for (let i = start; i < end && i < savedMovies.length; i++) {
        const movie = savedMovies[i];
        savedMoviesDiv.innerHTML += `
            <div class="movie">
                <img  src="${movie.Poster}" class="img-thumbnail">
                <h2>${movie.Title}</h2>
                <div class="movie-details">
                    <strong>Plot:</strong> ${movie.Plot}
                </div>
                <div class="center">
                    <p><strong>Year:</strong> ${movie.Year}</p>
                    <p><strong>Rated:</strong> ${movie.Rated}</p>
                    <p><strong>Genre:</strong> ${movie.Genre}</p>
                </div>
                <p><strong>Actors:</strong> ${movie.Actors}</p>
                <p><strong>Type:</strong> ${movie.Type}</p>
                <p><strong>Released:</strong> ${movie.Released}</p>
                <a href="movieDetails.html?title=${encodeURIComponent(movie.Title)}" class="btn btn-primary">View Details</a>
            </div>
        `;
    }

    const totalPages = Math.ceil(savedMovies.length / 5);
    const pagesDiv = document.getElementById('pages');
    pagesDiv.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        pagesDiv.innerHTML += `<button onclick="goToPage(${i})">${i + 1}</button>`;
    }
}

function goToPage(page) {
    currentPage = page;
    displaySavedMovies(currentPage);
}

function saveToLocalStorage(movieData) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    savedMovies.push(movieData);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
}

// Function to display movies on the main page
function displayMovies() {
    const apiUrl = 'http://www.omdbapi.com/?s=action&apikey=cf423da3';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movieGalleryDiv = document.getElementById('movieGallery');
            movieGalleryDiv.innerHTML = '';

            data.Search.forEach(movie => {
                movieGalleryDiv.innerHTML += `
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <img src="${movie.Poster}" class="img-fluid" alt="${movie.Title}">
                            <div class="card-body">
                                <p class="card-text">${movie.Title}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary">Save</button>
                                    </div>
                                    <small class="text-muted">${movie.Year}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}


