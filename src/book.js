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

    //    (bookInfo.authors) ? let author = bookInfo.authors[0] : let author = "No known author"
           
        // if (!!bookInfo.authors) {
            let author = bookInfo.authors[0]
        // } else {
        //     let author = "No known author"
        // }

        // if (!!bookInfo.description) {
            let description = bookInfo.description
        // } else {
        //     let description = "No preview given"
        // }

        let image = bookInfo.imageLinks.thumbnail

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