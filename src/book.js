class Book{
    static allBooks = []

    constructor(book) {
        this.title = book.title
        this.author = book.author
        this.image = book.image
        this.description = book.description
        this.id = book.id
        // debugger
        //note to self - edit to search by book title name.  Currently this includes repeat books because the book ids are different 
        // if (!Book.allBooks.includes(this)) {
            Book.allBooks.push(this)
            // debugger
        // } else {
        //     console.log("This book already exists")
        // }
         
    }

    static createBook(bookInfo) {  
        possibleSugs.innerHTML = ""
        let title = bookInfo.title
        let author
        let description
           
        if (!!bookInfo.authors) {
            author = bookInfo.authors[0]
        } else {
            author = "No known author"
        }

        if (!!bookInfo.description) {
            description = bookInfo.description
        } else {
            description = "No preview given"
        }
        let image = bookInfo.imageLinks.thumbnail
        let book = {book: {title, author, description, image}}
        
        let options = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify(book)
        }
        // document.getElementsById("search-button").value = "" 
        fetch("http://localhost:3000/books", options) 
        .then(resp => resp.json())
        .then(book => new Book(book))
        .then(book => Suggestion.createSuggestion(book.id))
    }


}