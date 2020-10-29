class Member {
    static allMembers = []

    constructor(member) {
        this.id = member.id
        this.first_name = member.first_name
        this.last_name = member.last_name
        this.book_group_id = member.book_group_id
        Member.allMembers.push(this)
    }
}