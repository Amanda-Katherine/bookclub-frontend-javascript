class BookGroup {

    static allGroups = []

    constructor(group) {
        this.name = group.name
        this.id = group.id
        BookGroup.allGroups.push(this)
        // debugger
    }


}