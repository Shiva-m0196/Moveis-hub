// http://www.omdbapi.com/?apikey=[yourkey]&
// API="http://www.omdbapi.com/?apikey=25cf430c&t=avenger"

// STEP 1: HTML ELEMENTS KO SELECT KARNA
const movieForm = document.getElementById("movieForm");
const movieInput = document.getElementById("movieInput");
const movieList = document.getElementById("movieList");
// const movieDetails = document.getElementById("movieDetails");

// STEP 2: FORM SUBMIT EVENT
// Jab user Search button par click karega, ye event chalega.
movieForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Page ko reload hone se rokta hai.

  // Input field se movie ka naam lena aur extra spaces hatana.
  let quary = movieInput.value.trim();

  // Agar input empty hai, toh alert show hoga.
  if (!quary) {
    alert("Please enter a movie name");
    return;
  }
  console.log(quary);

  // Movie search karne ke function ko call karna.
  searchMovies(quary);
});

// STEP 3: API SE MOVIES KA DATA FETCH KARNA
async function searchMovies(quary) {
  // API response aane tak loader show karna.
  movieList.innerHTML = `<div class="loader"></div>`;
  // Search query ko URL mein safely encode karke API request bhejna.
  let res = await fetch(
    `https://www.omdbapi.com/?apikey=25cf430c&s=${encodeURIComponent(quary)}`,
  );
  // API response ko JSON mein convert karna.
  let data = await res.json();
  console.log(data);
  // Agar movie nahi mili, toh error show karna.
  if (data.Response === "False") {
    movieList.innerHTML = `
            <h1 class="text-2xl font-bold text-red-600">
                ${data.Error}
            </h1>`;
    return;
  }
  // API se mili movies ko display karna.
  displayMovies(data.Search);
}

// STEP 4: MOVIES KO WEBPAGE PAR DISPLAY KARNA
function displayMovies(data) {
  // Purane search results ko clear karna.
  movieList.innerHTML = "";

  // Har movie ke liye ek card create karna.
  data.forEach((movie) => {
    // Naya div element create karna.
    const div = document.createElement("div");

    // Movie ki IMDb ID ko card mein store karna.
    div.dataset.imdbID = movie.imdbID;

    // Movie card ko CSS class dena.
    div.setAttribute("class", "movie-card");

    // Movie ka poster, title aur year add karna.
    div.innerHTML = `
            <div>
                <img src="${movie.Poster}" alt="${movie.Title}">
            </div>

            <div>
                <p class="text-lg font-semibold mt-2 text-red-600">
                    ${movie.Title}
                </p>

                <p class="text-red-600">${movie.Year}</p>
            </div>
        `;

    // Movie card ko movieList ke andar add karna.
    movieList.append(div);
  });
}

// STEP 5: MOVIE CARD PAR CLICK EVENT
// Movie list ke andar kisi movie par click hone par ye event chalega.
movieList.addEventListener("click", (e) => {
    e.stopPropagation();
  // Click kiye gaye element ka movie-card parent dhoondhna.
  const movieCard = e.target.closest(".movie-card");
  // Agar movie card par click nahi hua, toh function rokna.
  if (!movieCard) return;
  // Click ki gayi movie ki IMDb ID lena.
  const movieId = movieCard.dataset.imdbID;
//   console.log(movieId);
location.href=`movie-details.html?id=${movieId}`; 



  // Selected movie ki complete details fetch karna.
  getMovieDetails(movieId);
});
// STEP 6: SELECTED MOVIE KI COMPLETE DETAILS FETCH KARNA
async function getMovieDetails(id) {
  // IMDb ID ke through specific movie ki details mangwana.
  let res = await fetch(`https://www.omdbapi.com/?apikey=25cf430c&i=${id}`);

  // Response ko JSON mein convert karna.
  let data = await res.json();

  console.log(data);

  // Agar details nahi mili, toh error show karna.
  if (data.Response === "False") {
    movieDetails.innerHTML = `<p>${data.Error}</p>`;
    return;
  }

  // Movie ki complete details webpage par show karna.
  movieDetails.innerHTML = `
        <div class="p-5 text-white">
            <img src="${data.Poster}" alt="${data.Title}" class="w-48 mb-4">

            <h2 class="text-2xl font-bold">${data.Title}</h2>
            <p>Year: ${data.Year}</p>
            <p>Genre: ${data.Genre}</p>
            <p>Director: ${data.Director}</p>
            <p>Actors: ${data.Actors}</p>
            <p>IMDb Rating: ${data.imdbRating}</p>

            <h3 class="text-lg font-semibold mt-3">Plot</h3>
            <p>${data.Plot}</p>
        </div>
    `;
}
