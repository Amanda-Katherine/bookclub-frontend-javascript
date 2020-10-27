const BACKEND_URL = "http://localhost:3000";

let appContainer = document.querySelector('main')
appContainer.setAttribute("class", "suggestions-container")

function bookSearch(){
    
    let search = document.getElementById('search').value
    // document.getElementById('title').innerHTML = ""
    // document.getElementById('author').innerHTML = ""
    // document.getElementById('description').innerHTML = ""
    // document.getElementById('cover-image')
    
    
    console.log(search)
    
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",
        
        success: function(data) {
            console.log(data)
            appContainer.innerHTML = ""
            for(i=0; i<data.items.length; i++){
                let bookContainer = document.createElement('section')
                let title = document.createElement('div')
                let author = document.createElement('div')
                let description = document.createElement('div')
                let img = document.createElement('img')
                
                bookContainer.append(title, author, description, img)
                appContainer.append(bookContainer)
                
                bookContainer.id = `book-${i+1}`
                bookContainer.setAttribute("class", "suggestion-card")
                title.innerHTML += "<h2>" + data.items[i].volumeInfo.title + "</h2>"
                
                if (!!data.items[i].volumeInfo.authors){
                    author.innerHTML += "<h4><strong>Written by: </strong>" + data.items[i].volumeInfo.authors[0] + "</h2>"
                } else {
                    author.innerHTML += "<h4>No known author</h2>"
                }
                if (!!data.items[i].volumeInfo.description) {
                    description.innerHTML += "<p>" + data.items[i].volumeInfo.description
                } else {
                    description.innerHTML += "<p><strong>Description:</strong> No Description Available</p>"
                }
                img.src += data.items[i].volumeInfo.imageLinks.thumbnail
            }
        },
        type: 'GET'
    })
}

document.getElementById('button').addEventListener('click', bookSearch, false)