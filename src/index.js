const BACKEND_URL = "http://localhost:3000";

let appContainer = document.querySelector("main");
let gatheringContainer = document.createElement("div");
let grpContainer = document.createElement("div");
let sugContainer = document.createElement("div");
let possibleSugs = document.createElement("div");
let grpSugs = document.createElement("div");
let search = document.getElementById("search-container");
let navLogin = document.querySelector("#nav-login");
let navLogout = document.querySelector("#nav-logout");
let navBookClubs = document.querySelector("#nav-select-club");

appContainer.setAttribute("id", "app-container");
gatheringContainer.setAttribute("class", "gathering-container");
grpContainer.setAttribute("class", "group-container");
grpContainer.setAttribute("id", "book-group-container");
sugContainer.setAttribute("class", "suggestions-container");
sugContainer.setAttribute("id", "suggestions-group-container");
search.setAttribute("id", "search-container");

appContainer.append(grpContainer);
appContainer.append(gatheringContainer);

//add event listener to fetch book groups when clicked in navbar
document
  .getElementById("nav-select-club")
  .addEventListener("click", BookGroup.fetchClubNamesandBooks.bind(BookGroup), {
    once: true,
  });

//add event listeners to search to fetch matching books from Google Books API
document
  .getElementById("search-button")
  .addEventListener("click", Suggestion.fetchSuggestionOptions, false);

search.addEventListener("keydown", (e) => {
  let key = e.which;

  if (key === 13) {
    Suggestion.fetchSuggestionOptions();
  }
});

//add event listener to navbar login/logout
let logoutEventListener = document.querySelector("#nav-logout");
logoutEventListener.addEventListener("click", submitLogout);

//toggle navbar/hamburger depending on media screen size
const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("open");
});

//only show login/registration page if member is not already logged in
if (!localStorage.getItem("memberId")) {
  localStorage.setItem("loggedIn", false);
  navLogin.style.display = "none";
  navLogout.style.display = "none";
  navBookClubs.style.display = "none";
  //function below is in member_sessions.js
  loadRegistrationLogin();
} else {
  navLogout.style.display = "block";
  navLogin.style.display = "none";
}
