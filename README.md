# 🎬 Movies Site

A simple movie browsing web app that fetches and displays popular movies using the TMDB API. Users can also search for any movie or series in real time.

---

## 🚀 Features

* 🔥 Displays trending/popular movies
* 🔍 Search functionality for movies and series
* 🖼️ Movie posters with titles
* ⚡ Fast and lightweight (vanilla JavaScript)
* 🎨 Clean UI with custom CSS

---

## 🛠️ Tech Stack

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* TMDB API

---

## 📸 Preview

**Before SEARCH**
<img width="1337" height="617" alt="Screenshot From 2026-04-05 00-10-24" src="https://github.com/user-attachments/assets/ae14f2bf-be58-4289-835c-d7783233a167" />



---


<img width="1337" height="617" alt="Screenshot From 2026-04-05 00-10-16" src="https://github.com/user-attachments/assets/8064715c-690b-49e3-b1cb-de1440eb3789" />






---

## ⚙️ How It Works

* The app fetches movie data from the TMDB API using `fetch()`
* Movie data (title, poster, etc.) is dynamically rendered into the DOM
* When a user searches, a new API request is made with the search query
* Results are updated instantly on the page

---

## 🔑 API Setup

This project uses The Movie Database (TMDB) API.

1. Go to: https://www.themoviedb.org/
2. Create an account
3. Generate your API key
4. Replace the API key in `script.js`:

```js
const API_KEY = "your_api_key_here";
```

---

## ▶️ Run Locally

Just open the project:

```bash
git clone https://github.com/your-username/movies-site.git
cd movies-site
```

Then open `index.html` in your browser.

---

## ⚠️ Notes

* Make sure you use **https** for API requests (not http)
* Some browsers block requests if the API is incorrect or insecure
* If nothing shows, check the console (F12)


  

---

## 📌 Future Improvements

* ⭐ Add movie ratings
* 📝 Show movie descriptions
* 🎨 Improve UI (hover effects, animations)
* 📱 Make it fully responsive
* ❤️ Add favorites/watchlist feature

---

## 🙌 Acknowledgements

* TMDB API for movie data
* Inspiration from modern movie apps like Netflix

---

## 📄 License

This project is open source and free to use.


