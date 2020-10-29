class Suggestion {
    static allSuggestions = []

    constructor(suggestion) {
        // debugger
            this.id = suggestion.id
            this.vote = suggestion.vote
            this.book_id = suggestion.book_id
            this.book_group_id = suggestion.book_group_id
        
        // if (!Suggestion.allSuggestions.includes(this)) {
            Suggestion.allSuggestions.push(this)
        // }
    }

    static fetchSuggestionOptions() {
        let search = document.getElementById('search').value
        return fetch("https://www.googleapis.com/books/v1/volumes?q=" + search)
        .then(response => response.json())
        .then(data => Suggestion.renderSuggestions(data.items))}
      
        
    static renderSuggestions(data) {
        console.log(data)
        // console.log(data.items)
        debugger
        appContainer.innerHTML = ""

        let sugContainer = document.createElement('div')
        sugContainer.setAttribute("class", "suggestions-container")
        appContainer.append(sugContainer)

        let i = 0  //won't run withour defining i
        for(i=0; i<data.length; i++){
            let bookContainer = document.createElement('section')
            let title = document.createElement('div')
            let author = document.createElement('div')
            let description = document.createElement('div')
            let img = document.createElement('img')
            let button = document.createElement('button')
            title.id = "title"
            author.id = "author"
            description.id = "description"
            img.id = "cover-image"

            title.setAttribute("class", "book-details")
            author.setAttribute("class", "book-details")
            description.setAttribute("class", "book-details")
            img.setAttribute("class", "book-details")


            button.id = `button-${i+1}`
            button.type = "click"
            button.innerHTML = "Suggest this Book"
            
            bookContainer.append(title, author, description, img, button)
            sugContainer.append(bookContainer)
            
            bookContainer.id = `suggestion-${i+1}`
            bookContainer.setAttribute("class", "suggestion-card")

            let bookInfo = data[i].volumeInfo
            title.innerHTML += "<h2>" + bookInfo.title + "</h2>"
            
            if (!!bookInfo.authors){
                author.innerHTML += "<h4><strong>Written by: </strong>" + bookInfo.authors[0] + "</h2>"
            } else {
                author.innerHTML += "<h4>No known author</h2>"
            }

            if (!!bookInfo.description) {
                description.innerHTML += "<p>" + bookInfo.description
            } else {
                description.innerHTML += "<p><strong>Description:</strong> No Description Available</p>"
            }

            if (!!bookInfo.imageLinks.thumbnail) {
                img.src += bookInfo.imageLinks.thumbnail
            } else {
                img.src += "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-stock-vector-no-image-available-icon-flat-vector.jpg?ver=6"
            }
            // debugger

            let arg = bookInfo

            button.addEventListener('click', function(){
                Book.createBook(arg)
            })
        }
    }

    // static fetchSuggestions() {
    //     fetch("BACKEND_URL/suggestions")
    //     .then(resp => console.log(resp))
    // }
}