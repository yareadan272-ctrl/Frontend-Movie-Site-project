
const API_KEY = "d24d707ba3fb208316f0a0ec7589a90f";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("section");
const hero = document.getElementById("hero");
const logo = document.getElementById("logo-home");
const contentWrap = document.getElementById("main-content");
const form = document.getElementById("form");
const search = document.getElementById("query");
const modal = document.getElementById("movie-modal");
const modalBody = document.getElementById("modal-body");
const sectionTitle = document.getElementById("section-title");
const historyContainer = document.getElementById("history-container");
const historySection = document.getElementById("history-section");

let favorites = JSON.parse(localStorage.getItem("adam_watchlist")) || [];
let watchHistory = JSON.parse(localStorage.getItem("adam_history")) || [];

async function initApp() {
  const res = await fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
  const data = await res.json();
  updateHero(data.results[0]);
  renderMovies(data.results, main);
}

function updateHero(item) {
  hero.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.2)), url(${IMG_PATH + item.backdrop_path})`;
  hero.innerHTML = `<div style="padding: 0 6%;"><h1 style="font-size:4rem; font-weight:800;">${item.title || item.name}</h1><p style="max-width:650px; font-size:1.1rem; line-height:1.4;">${item.overview.slice(0, 180)}...</p></div>`;
}

function renderMovies(movies, container) {
  container.innerHTML = movies.length
    ? ""
    : `<p style="padding:40px; color:#555;">Empty list. 🍿</p>`;
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <div class="rating">⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : "NR"}</div>
            <img src="${IMG_PATH + movie.poster_path}" class="thumbnail" onclick="openModal(${movie.id})">
            <p style="padding:15px 10px; font-size:0.9rem; font-weight:bold;">${movie.title || movie.name}</p>
        `;
    container.appendChild(card);
  });
}

window.toggleFav = (movieStr) => {
  const movie = JSON.parse(decodeURIComponent(movieStr));
  const idx = favorites.findIndex((f) => f.id === movie.id);
  const btn = document.getElementById("modal-fav-btn");
  if (idx > -1) {
    favorites.splice(idx, 1);
    btn.innerText = "+ Add to My List";
    btn.style.color = "white";
  } else {
    favorites.push(movie);
    btn.innerText = "✓ In My List";
    btn.style.color = "#E50914";
  }
  localStorage.setItem("adam_watchlist", JSON.stringify(favorites));
};

async function openModal(id) {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  let res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  let item = await res.json();
  if (!item.title) {
    res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
    item = await res.json();
  }
  watchHistory = watchHistory.filter((m) => m.id !== item.id);
  watchHistory.unshift(item);
  localStorage.setItem(
    "adam_history",
    JSON.stringify(watchHistory.slice(0, 12)),
  );
  const vidRes = await fetch(
    `${BASE_URL}/${item.title ? "movie" : "tv"}/${id}/videos?api_key=${API_KEY}`,
  );
  const vids = await vidRes.json();
  const trailer = vids.results.find((v) => v.type === "Trailer");
  const isFav = favorites.some((f) => f.id === item.id);
  modalBody.innerHTML = `
        <div class="video-container"><iframe src="https://www.youtube.com/embed/${trailer?.key}?autoplay=1" frameborder="0" allow="autoplay" allowfullscreen></iframe></div>
        <div style="padding: 35px;">
            <div style="display:flex; justify-content:space-between; align-items:start;">
                <h2>${item.title || item.name}</h2>
                <button id="modal-fav-btn" style="background:rgba(255,255,255,0.1); border:none; color:${isFav ? "#E50914" : "white"}; padding:12px 20px; border-radius:4px; cursor:pointer;" 
                onclick="toggleFav('${encodeURIComponent(JSON.stringify(item))}')">${isFav ? "✓ In My List" : "+ Add to My List"}</button>
            </div>
            <p style="color:#ccc; margin-top:20px; line-height:1.8;">${item.overview}</p>
        </div>`;
}

const goHome = (e) => {
  if (e) e.preventDefault();
  hero.style.display = "flex";
  logo.style.display = "inline-block";
  contentWrap.style.marginTop = "0px";
  historyContainer.style.display = "none";
  sectionTitle.innerText = "Trending Now";
  initApp();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

document.getElementById("logo-home").onclick = goHome;
document.getElementById("show-home").onclick = goHome;
document.getElementById("show-favorites").onclick = () => {
  hero.style.display = "none";
  logo.style.display = "none";
  contentWrap.style.marginTop = "30px";
  sectionTitle.innerText = "My List ❤️";
  renderMovies(favorites, main);
  historyContainer.style.display = "block";
  renderMovies(watchHistory, historySection);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  logo.style.display = "inline-block";
  contentWrap.style.marginTop = "0px";
  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${search.value}`,
  );
  const data = await res.json();
  sectionTitle.innerText = `Results for: "${search.value}"`;
  renderMovies(data.results, main);
});

document.querySelector(".close-modal").onclick = () => {
  modal.style.display = "none";
  modalBody.innerHTML = "";
  document.body.style.overflow = "auto";
};
initApp();

