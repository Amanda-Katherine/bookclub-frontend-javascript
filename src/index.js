const BACKEND_URL = "http://localhost:3000";

let appContainer = document.querySelector('main')
let sugContainer = document.createElement('div')
let grpContainer = document.createElement('div')
sugContainer.setAttribute("class", "suggestions-container")
grpContainer.setAttribute("class", "group-container")



document.getElementById('search-button').addEventListener('click', Suggestion.fetchSuggestionOptions, false)
document.getElementById('select-club').addEventListener('click', BookGroup.fetchClubNames.bind(BookGroup), false)

