class BookGroup {

    static allGroups = []

    constructor(group) {
        this.name = group.name
        this.id = group.id
        BookGroup.allGroups.push(this)

        this.books = group.books
        this.suggestions = group.suggestions.map(suggestion => new Suggestion(suggestion))
        this.gatherings = group.gatherings.map(gathering => new Gathering(gathering))
        this.members = group.members.map(member => new Member(member))
    }

    // static fetchClubNames() {
    //     fetch("http://localhost:3000/book_groups")
    //     .then(r => r.json())
    //     .then(groups => {
    //         for (let group of groups) {
    //             let newGroup = new BookGroup(group)
    //         }
    //         this.renderGroups()  
    //     })
    // }

    // static async fetchClubNames() {
    //     let groupsResponse = await fetch("http://localhost:3000/book_groups")
        
    //     let groups = await groupsResponse.json()
        
    //     for (let group of groups) {
    //         let newGroup = new BookGroup(group)
    //     }
    //     this.renderGroups()  
    // }

    static async fetchClubNamesandBooks() {
        let [groupsResponse, booksResponse] = await Promise.all([
            fetch("http://localhost:3000/book_groups"),
            fetch("http://localhost:3000/books"),
        ])

        let groups = await groupsResponse.json()
        let books = await booksResponse.json()

        for (let book of books) {
            let newBook = new Book(book) 
        }

        for (let group of groups) {
            let newGroup = new BookGroup(group)
        }
        this.renderGroups()  

    }
    
    static renderGroups() {
        search.style.display = "none"
        document.getElementById('select-club').addEventListener('click', ()=> BookGroup.renderGroups())
        
        grpSugs.innerHTML = ""

        grpContainer.innerHTML = ""
        
        for (let group of BookGroup.allGroups) {
            group.renderGroup()
        }
    }

    renderGroup() {
       
        let pgh = document.createElement('p')
        pgh.id = `group-${this.id}` 
        pgh.setAttribute("class", "group-name")
        pgh.innerText = this.name
        
        grpContainer.append(pgh)
        appContainer.append(grpContainer)
        let groupId = this.id - 1
    
        pgh.addEventListener('click', ()=>{
            let bg = BookGroup.allGroups.find(group => group.id === (groupId+1))
            bg.showGroup()
        })
    }

    showGroup() {
        
        // grpContainer.append(search)
        search.style.display = "block"
        
        grpContainer.innerHTML = `<h2 class="group-header-name">${this.name}</h2>`
        grpContainer.id = `${this.id} - group`
        
        let groupSuggestedBookIds = []
        let groupSuggestedBooks = []
        for (let suggestion of this.suggestions) {
            groupSuggestedBookIds.push(suggestion.book_id)
        }
        
        for (let bookId of groupSuggestedBookIds) {
            for (let book of Book.allBooks) {
                if (bookId === book.id) {
                    groupSuggestedBooks.push(book)
                }
            }
        }
        
        grpContainer.append(sugContainer)
        for (let book of groupSuggestedBooks) {
            
            Suggestion.renderSuggestion(book)
        }
        // BookGroup.allGroups[2].resetGroupSuggestions()
        // findGroupSuggestions()
        // let container = 
    }

    resetGroupSuggestions() {
        let sugIds = this.suggestions.map(sug => sug.id)

        //delete instances of suggestions
// debugger
        //delete book_group.suggestions as well? 
        this.deleteGroupSuggestions()
    }
    
    deleteGroupSuggestions() {
        console.log(suggestions)
        // const updatedBookGroup = this.map(({suggestions, ...}))
        // for delete post - create forloop to delete all at once (restfully)
        // once deleted (and confirmed), set this.suggestions = []
    }

}

