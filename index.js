
// On app load, get all movies from localStorage
window.onload = loadMovies;

// On form submit add movie
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  addMovie();
});

function loadMovies() {
  // check if localStorage has any movies
  // if not then return
  if (localStorage.getItem("movies") == null) return;

  // Get the movies from localStorage and convert it to an array
  let movies = Array.from(JSON.parse(localStorage.getItem("movies")));

  // Loop through the movies and add them to the list
  movies.forEach(movie => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="text" value="${movie.movie}">
      <i class="fa fa-trash" onclick="removeMovie(this)"></i>`;
    list.insertBefore(li, list.children[0]);
  });
}




//add Movie
function addMovie() {
  const movie = document.querySelector("#movietitle");
  const list = document.querySelector("ul");
  // return if movie is empty
  if (movie.value === "") {
    alert("Please add movie!");
    return false;
  }
  // check if movie already exist
  if (document.querySelector(`input[value="${movie.value}"]`)) {
    alert("Movie already exist!");
    return false;
  }

  // add movie to local storage
  localStorage.setItem("movies", JSON.stringify([...JSON.parse(localStorage.getItem("movies") || "[]"), { movie: movie.value, completed: false }]));

  // create list item, add innerHTML and append to ul
  const li = document.createElement("li");
  li.innerHTML = `
  <input type="text" value="${movie.value}">
  <i class="fa fa-trash" onclick="removeMovie(this)"></i>`;
  list.insertBefore(li, list.children[0]);
  // clear input
  movie.value = "";
}


function removeMovie(event) {
  let movies = Array.from(JSON.parse(localStorage.getItem("movies")));
  movies.forEach(movie => {
    if (movie.movie === event.parentNode.children[1].value) {
      // delete movie
      movies.splice(movies.indexOf(movie), 1);
    }
  });
  localStorage.setItem("movies", JSON.stringify(movies));
   event.parentElement.remove();
}

// store current movie to track changes
var currentMovie = null;

// get current movie
function getCurrentMovie(event) {
  currentMovie = event.value;
}

//hide movies

const checkbox = document.querySelector("#hidemovies");
const movieList = document.querySelector(".movie-container");
checkbox.addEventListener("click", (e) => {
  movieList.hidden = e.target.checked;
});





