const BACKEND_URL = "http://localhost:3000";

let appContainer = document.querySelector('main')
appContainer.setAttribute("class", "suggestions-container")

document.getElementById('search-button').addEventListener('click', Suggestion.fetchSuggestionOptions, false)
document.getElementById('select-club').addEventListener('click', BookGroup.fetchClubNames.bind(BookGroup), false)

