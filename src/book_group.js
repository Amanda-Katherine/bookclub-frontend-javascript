class BookGroup {

    static allGroups = []

    constructor(group) {
        this.name = group.name
        this.id = group.id
        BookGroup.allGroups.push(this)
        // debugger
    }

    static fetchClubNames() {
        fetch("http://localhost:3000/book_groups")
        .then(r => r.json())
        .then(groups => {
            for (let group of groups) {
                let newGroup = new BookGroup(group)
            }
            console.log(this)
            // debugger
            this.renderGroups()
            console.log("passed")
        })
    }

    static renderGroups() {
        appContainer.setAttribute("class", "suggestions-container")
        appContainer.innerHTML = ""

        for (let group of BookGroup.allGroups) {
            group.renderGroup()
        }
    }

    renderGroup() {
        console.log("yay?")
        let groupContainer = document.createElement('div')
        groupContainer.id = "group-container"
        let groupDiv = document.createElement('div')
        debugger
        let pgh = document.createElement('p')
        // pgh.id = `group-${this.id}` SET VALUE OF GROUP ID HERE
        pgh.innerText = this.name

        groupDiv.append(pgh)
        groupContainer.append(groupDiv)

        // pgh.addEventListener('click', this.signIn)
    }

}