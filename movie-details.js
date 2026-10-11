
const movieDetail = document.getElementById("movieDetail");

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

async function searchMovies(id) {
  try {
    movieDetail.innerHTML = `
      <p class="text-slate-400">Loading movie details...</p>
    `;

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=25cf430c&i=${encodeURIComponent(id)}&plot=full`
    );

    const data = await res.json();

    console.log("Movie data:", data);

    if (data.Response === "True") {
      displayMovies(data);
    } else {
      movieDetail.innerHTML = `
        <p class="text-red-400">
          Movie not found: ${data.Error || "Unknown error"}
        </p>
      `;
    }
  } catch (error) {
    console.error("Error:", error);

    movieDetail.innerHTML = `
      <p class="text-red-400">
        Movie load nahi hui. Internet connection check karo.
      </p>
    `;
  }
}

function displayMovies(data) {
  movieDetail.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-start">

      <div class="bg-slate-900 p-4 rounded-2xl border border-slate-700">
        <img
          src="${data.Poster !== "N/A" ? data.Poster : ""}"
          alt="${data.Title}"
          class="w-full rounded-xl shadow-xl"
        />
      </div>

      <div class="space-y-6">

        <h2 class="text-3xl font-bold text-red-500">
          ${data.Title}
        </h2>

        <div class="flex flex-wrap gap-3">
          <span class="bg-slate-800 px-4 py-2 rounded-lg">${data.Released}</span>
          <span class="bg-slate-800 px-4 py-2 rounded-lg">${data.Rated}</span>
          <span class="bg-slate-800 px-4 py-2 rounded-lg">${data.Runtime}</span>
          <span class="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg">${data.Genre}</span>
        </div>

        <div class="bg-slate-800 p-5 rounded-xl border border-yellow-500/30">
          <p class="text-slate-400 text-sm">IMDb Rating</p>
          <p class="text-2xl font-bold text-yellow-400">
            ★ ${data.imdbRating} / 10
          </p>
        </div>

        <div class="bg-slate-800/70 p-5 rounded-xl border border-slate-700">
          <h3 class="text-xl font-semibold text-red-400 mb-3">Plot Overview</h3>
          <p class="text-slate-300 leading-7">${data.Plot}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div class="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <p class="text-red-400 text-sm mb-2">Director</p>
            <p>${data.Director}</p>
          </div>

          <div class="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <p class="text-red-400 text-sm mb-2">Writer</p>
            <p>${data.Writer}</p>
          </div>

          <div class="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <p class="text-red-400 text-sm mb-2">Actors</p>
            <p>${data.Actors}</p>
          </div>

          <div class="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <p class="text-red-400 text-sm mb-2">Language</p>
            <p>${data.Language}</p>
          </div>

          <div class="bg-slate-800 p-5 rounded-xl border border-slate-700 sm:col-span-2">
            <p class="text-red-400 text-sm mb-2">Country</p>
            <p>${data.Country}</p>
          </div>

        </div>

        <a
          href="https://www.imdb.com/title/${data.imdbID}/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold"
        >
          View on IMDb ↗
        </a>

      </div>
    </div>
  `;
}

if (movieId) {
  searchMovies(movieId.trim());
} else {
  movieDetail.innerHTML = `
    <p class="text-red-400">Movie ID nahi mili. Movie Hub se movie select karo.</p>
  `;
}
