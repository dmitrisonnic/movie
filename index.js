const API_KEY = "9296f52903103fbd908862331d831859";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const url =
  "https://api.themoviedb.org/3/search/movie?api_key=9296f52903103fbd908862331d831859";

function generateUrl(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=9296f52903103fbd908862331d831859`;
  return url;
}
function searchMovie(value) {
  const path = "/search/movie";
  const url = generateUrl(path) + "&query=" + value;
  requestMovies(url, renderSearchMovies, handError);
}
function requestMovies(url, onComplete, onError) {
  fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError);
}

function getUpcomingMovies() {
  const path = "/movie/upcoming";
  const url = generateUrl(path);
  requestMovies(url, renderSearchMovies, handError);
}

function getTopRatedMovies() {
  const path = "/movie/top_rated";
  const url = generateUrl(path);
  requestMovies(url, renderMovies, handError);
}

function getPopularMovies() {
  const path = "/movie/popular";
  const url = generateUrl(path);
  requestMovies(url, renderMoviesTwo, handError);
}

function getTopMovies() {
  const path = "/movie/upcoming";
  const url = generateUrl(path);
  requestMovies(url, renderMoviesThree, handError);
}
