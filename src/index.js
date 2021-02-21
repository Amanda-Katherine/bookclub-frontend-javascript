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

gatheringContainer.setAttribute("class", "gathering-container")
grpContainer.setAttribute("class", "group-container")
sugContainer.setAttribute("class", "suggestions-container")
appContainer.append(grpContainer)
appContainer.append(gatheringContainer)

document.getElementById('search-button').addEventListener('click', Suggestion.fetchSuggestionOptions, false)
document.getElementById('select-club').addEventListener('click', BookGroup.fetchClubNamesandBooks.bind(BookGroup), {once: true})

search.addEventListener("keydown", function(e) {
    let key = e.which || e.keyCode()

    if (key === 13) {Suggestion.fetchSuggestionOptions()}
})


