const BACKEND_URL = "http://localhost:3000";

let appContainer = document.querySelector('main')
let grpContainer = document.createElement('div')
let sugContainer = document.createElement('div')
grpContainer.setAttribute("class", "group-container")
sugContainer.setAttribute("class", "suggestions-container")
appContainer.append(grpContainer)
appContainer.append(sugContainer)



document.getElementById('search-button').addEventListener('click', Suggestion.fetchSuggestionOptions, false)
document.getElementById('select-club').addEventListener('click', BookGroup.fetchClubNames.bind(BookGroup), false)

