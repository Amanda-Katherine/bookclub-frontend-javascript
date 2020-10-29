class BookGroup {

    static allGroups = []

    constructor(group) {
        // debugger
        this.name = group.name
        this.id = group.id
        BookGroup.allGroups.push(this)

        this.books = group.books.map(book => new Book(book))
        this.suggestions = group.suggestions.map(suggestion => new Suggestion(suggestion))
        this.gatherings = group.gatherings.map(gathering => new Gathering(gathering))
        this.members = group.members.map(member => new Member(member))
    }

    static fetchClubNames() {
        // let grpContainer = document.getElementById('group-container')
        // debugger
        fetch("http://localhost:3000/book_groups")
        .then(r => r.json())
        // .then(test => {
        //     console.log(test)
        //     // console.log(this)
        //     return test
        // })
        .then(groups => {
            for (let group of groups) {
                let newGroup = new BookGroup(group)
            }
            // console.log(groups)
            // console.log(this)
            this.renderGroups()  
        })
    }
    
    static renderGroups() {
        // let oldCont = document.getElementById("group-container")
        // oldCont.remove()
        // debugger


       
        // appContainer.append(groupContainer)
        grpContainer.innerHTML = ""
        
        for (let group of BookGroup.allGroups) {
            group.renderGroup()
        }
    }

    renderGroup() {
        
        // grpContainer.innerHTML = ""

        // let groupContainer = document.createElement('div')
        // groupContainer.id = "group-container"

        let groupDiv = document.createElement('div')
        // debugger
        let pgh = document.createElement('p')
        pgh.id = `group-${this.id}` 
        pgh.innerText = this.name

        groupDiv.append(pgh)
        groupContainer.append(groupDiv)
        appContainer.append(groupContainer)
        console.log(this)
        let groupId = this.id - 1
        
        pgh.addEventListener('click', function(){console.log(BookGroup.allGroups[groupId])})

        // pgh.addEventListener('click', this.signIn)
    }

}