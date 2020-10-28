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
            BookGroup.allGroups.renderGroups
            console.log("passed")
        })
    }


}