const API_KEY = "6804533f4b2be81e845136cd97e3bccf";

let page = 1; //ini untuk pagination

const API_URL = () =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;
const API_IMAGE_URL = "https://image.tmdb.org/t/p/w1280";
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

function updatePage() {
  getMovies(API_URL());
  currentPage.innerHTML = page;
}

function nextPage() {
  if (page >= 1) {
    page += 1;
    updatePage();
  }
}

function prevPage() {
  if (page > 1) {
    page -= 1;
    updatePage();
  }
}

next.addEventListener("click", () => {
  nextPage();
});

prev.addEventListener("click", () => {
  prevPage();
});

function showMovies(movies) {
  moviesElement.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, overview, popularity, vote_average } = movie;
    //popularity dan vote_average adalah untuk PR

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie"); //untuk menambahkan class di div yang kita buat di atas

    movieCard.innerHTML = `
    <img src="${API_IMAGE_URL + poster_path}" alt = "html the movie image"/>
    <div class="detail">
      <h3>${title}</h3>
      <p>${overview.substring(0, 250)}...</p>
    </div>
    `;
    moviesElement.appendChild(movieCard);
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchQuery = search.value;

  if (searchQuery !== "") {
    getMovies(API_SEARCH_URL + searchQuery);
    search.value = "";
  }
});

updatePage();

title.addEventListener("click", () => {
  location.reload();
});
