const arrows = document.querySelectorAll(".arrow");
const arrow = document.querySelectorAll(".arrow-1");
const arro = document.querySelectorAll(".arrow-2");
const arr = document.querySelectorAll(".arrow-3");
const movieLists = document.querySelectorAll(".movie-list");
const movieList = document.querySelectorAll(".movie-list-2");
const movieLis = document.querySelectorAll(".movie-list-3");
const movieLi = document.querySelectorAll(".movie-list-4");

arrows.forEach((arrow, i) => {
  arrow.addEventListener("click", () => {
    movieLists[i].style.transform = `translateX(${
      movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
    }px)`;
  });
});

arrow.forEach((arrow, i) => {
  arrow.addEventListener("click", () => {
    movieList[i].style.transform = `translateX(${
      movieList[i].computedStyleMap().get("transform")[0].x.value - 300
    }px)`;
  });
  console.log(arrow);
});
arro.forEach((arrow, i) => {
  arrow.addEventListener("click", () => {
    movieLis[i].style.transform = `translateX(${
      movieLis[i].computedStyleMap().get("transform")[0].x.value - 300
    }px)`;
  });
  console.log(arrow);
});

arr.forEach((arrow, i) => {
  arrow.addEventListener("click", () => {
    movieLi[i].style.transform = `translateX(${
      movieLi[i].computedStyleMap().get("transform")[0].x.value - 300
    }px)`;
  });
  console.log(arrow);
});

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle,.featured-content,.featured-content-2"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});

const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#inputValue");
const moviesSearchable = document.querySelector(".movie-list");
const moviesContainer = document.querySelector(".movie-list-2");
const moviesContainers = document.querySelector(".movie-list-3");
const moviesContainerss = document.querySelector(".movie-list-4");

function movieSection(movies) {
  return movies.map((movie) => {
    if (movie.poster_path) {
      return `<img src = ${IMAGE_URL + movie.poster_path} data-movie-id=${
        movie.id
      }/>`;
    }
  });
}

function createVideoTemolate(data, content) {
  content.innerHTML = '<p id ="content-close"></p>';
  const videos = data.results;
  const length = videos.length > 1 ? 1 : videos.length;
  const iframeContainer = document.createElement("div");

  for (let i = 0; i < length; i++) {
    const video = videos[i];
    console.log(video);
    const iframe = createIframe(video);
    iframeContainer.appendChild(iframe);
    content.appendChild(iframeContainer);
  }
}

function createMovieContainer(movies) {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const movieTemplate = `
  <section class="section">
   ${movieSection(movies)}
    </section>
     <div class="content">
     <p id ="content-close">    ssssx</p>
    </div>
    `;

  movieElement.innerHTML = movieTemplate;
  return movieElement;
}

function renderSearchMovies(data) {
  moviesSearchable.innerHTML = "";
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  moviesSearchable.appendChild(movieBlock);
}

function renderMovies(data) {
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  moviesContainer.appendChild(movieBlock);
}

function renderMoviesTwo(data) {
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  moviesContainers.appendChild(movieBlock);
}
function renderMoviesThree(data) {
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  moviesContainerss.appendChild(movieBlock);
}

function handError(error) {
  console, log("Error:", error);
}

function createIframe(video) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = 360;
  iframe.height = 315;
  iframe.allowFullscreen = true;
  return iframe;
}

buttonElement.onclick = function (event) {
  event.preventDefault();
  const value = inputElement.value;
  searchMovie(value);
};
document.onclick = function (event) {
  const target = event.target;
  if (target.tagName.toLowerCase() === "img") {
    const section = event.target.parentElement; //section
    const content = section.nextElementSibling; //content
    const movieId = target.dataset.movieId;
    content.classList.add("content-display");

    const path = `/movie/${movieId}/videos`;
    const url = generateUrl(path);
    //fetch movie
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        createVideoTemolate(data, content);
      })
      .catch((error) => console.log("Error:", error));
  }
  if (target.id === "content-close") {
    const content = target.parentElement;
    content.classList.remove("content-display");
  }
};

getUpcomingMovies();

getTopRatedMovies();

getPopularMovies();

getTopMovies();
