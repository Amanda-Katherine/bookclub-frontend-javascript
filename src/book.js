class Book{
    static allBooks = []

    constructor(book) {
        debugger
        // this.title = book.
        // this.author = book.
        // this.cover_url = book.
        // this.preview = book.
        // Book.allBooks.push(this)  
    }

    static createBook(bookInfo) {    
        let title = bookInfo.title
        let author
        let description
    //    (bookInfo.authors) ? let author = bookInfo.authors[0] : let author = "No known author"
           
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
debugger
        let book = {book: {title, author, description, image}}
        
        let options = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify(book)
        }
        // document.getElementsById("search-button").value = "" 
        fetch("http://localhost:3000/books", options) 
        // .then(resp = console.log(resp))
        .then(resp => resp.json())
        .then(resp => console.log(resp))
        // debugger
    }
}