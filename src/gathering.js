class Gathering {
    static allGatherings = []

    constructor(gathering) {
        this.id = gathering.id
        this.host = gathering.host
        this.date = gathering.date
        this.address = gathering.address
        this.time = gathering.time
        Gathering.allGatherings.push(this)
    }

    static showNextGathering() {
        
    }
}