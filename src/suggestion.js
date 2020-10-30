class Suggestion {
    static allSuggestions = []

    constructor(suggestion) {
        // debugger
            this.id = suggestion.id
            this.vote = suggestion.vote
            this.book_id = suggestion.book_id
            this.book_group_id = suggestion.book_group_id

                // console.log(bookGroup)
            //find book group suggestions and push new suggestion. 
        
        // if (!Suggestion.allSuggestions.includes(this)) {
            Suggestion.allSuggestions.push(this)
        // }
    }

    static createSuggestion(sugInfo) {
        let book_id = sugInfo
        let book_group_id = parseInt(grpContainer.id)
        let vote

        let sugFinder = Suggestion.allSuggestions.find(sug => (sug.book_id === book_id && sug.book_group_id === book_group_id))
        
        // sugFunction:
        if (!!sugFinder) {
            console.log("suggestion already exists")
            let bg = BookGroup.allGroups.find(group => group.id = book_group_id)
            bg.showGroup()
            //how to have page show group page again without rerendering all other books?
            debugger
            return
        } else {
            let vote = "0"
        }
        
        let suggestion = {suggestion: {book_id, book_group_id, vote}}
        
        let options = {
            method: "POST", 
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify(suggestion)
        }
        fetch("http://localhost:3000/suggestions", options)
        .then(resp => resp.json())
        .then(suggestion => new Suggestion(suggestion))
        .then(sug => {
            let bookGroup = BookGroup.allGroups.find(bg => bg.id === sug.book_group_id)
            bookGroup.suggestions.push(sug)
            let suggestedBook = Book.allBooks.find(book => book.id === sug.book_id)
            // debugger
            this.renderSuggestion(suggestedBook)
        }) 
    }

    static fetchSuggestionOptions() {
        let search = document.getElementById('search').value
        possibleSugs.innerHTML = ""


        return fetch("https://www.googleapis.com/books/v1/volumes?q=" + search)
        .then(response => response.json())
        // .then(test => {
        //     console.log(test)
        //     return test})
        .then(data => Suggestion.renderSuggestions(data.items))
    }
      
        
    static renderSuggestions(data) {
        grpContainer.append(sugContainer)
        
        for (let suggestion of data) {
            this.renderSuggestion(suggestion)
        }
    }
    
    static renderSuggestion(data) {
        let bookContainer = document.createElement('section')
        let title = document.createElement('div')
        let author = document.createElement('div')
        let description = document.createElement('div')
        let img = document.createElement('img')
        let button = document.createElement('button')
        let voteCount = document.createElement('p')
        let sugCount = document.getElementsByClassName("sug-card").length
        
        this.setPageHeader(data)

        let bookInfo
        let suggestion
        if (data.volumeInfo) {
            bookInfo = data.volumeInfo

            
            possibleSugs.append(bookContainer)
            possibleSugs.style.display = "block"
            grpSugs.style.display = "none"
            
            button.id = `button-${sugCount+1}`
            button.type = "click"
            button.innerHTML = "Suggest this Book"

            button.addEventListener('click', function(){
                Book.createBook(bookInfo)
            })
        } else {
            bookInfo = data

            possibleSugs.style.display = "none"
            grpSugs.style.display = "block"
            
            grpSugs.append(bookContainer)
            
            
            button.id = `${sugCount+1}-vote-button`
            button.type = "click"
            button.innerHTML = "Vote for this Book"

            // let suggestion = Suggestion.allSuggestions.find(sug => sug.book_id === data.id) && (sug.book_group_id === parseInt(grpContainer.id))
            // debugger
            
            // button.addEventListener('click', ()=> {
            //     console.log(data)
            //     voteCount.innerText = `${suggestion.vote} vote(s)` 
            //     suggestion.voteForSuggestion()
            // })
        }

        title.id = "title"
        author.id = "author"
        description.id = "description"
        img.id = "cover-image"

        possibleSugs.setAttribute("class", "possible-suggestions")
        grpSugs.setAttribute("class", "suggested-books")
        title.setAttribute("class", "book-details")
        author.setAttribute("class", "book-details")
        description.setAttribute("class", "book-details")
        img.setAttribute("class", "book-details")
        voteCount.setAttribute("class", "vote-count")
        
        bookContainer.append(title, author, description, img, button, voteCount)
        sugContainer.append(possibleSugs, grpSugs)
        bookContainer.id = `${sugCount+1}-sug`
        bookContainer.setAttribute("class", "sug-card")
        
        let options = {
            method: "POST", 
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify(suggestion)
        }
        fetch("http://localhost:3000/suggestions", options)
        .then(resp => resp.json())
        .then(suggestion => new Suggestion(suggestion))
        .then(sug => {
            let bookGroup = BookGroup.allGroups.find(bg => bg.id === sug.book_group_id)
            bookGroup.suggestions.push(sug)
            let suggestedBook = Book.allBooks.find(book => book.id === sug.book_id)
            // debugger
            this.renderSuggestion(suggestedBook)
        }) 
    static setPageHeader(data) {
        if (!!data.volumeInfo) {
            sugContainer.innerHTML = "<h2> Suggest a Book to Read </h2>"
        } else {
            sugContainer.innerHTML = "<h2> Current Club Suggestions </h2>"
        }
    }
    
    }
} 