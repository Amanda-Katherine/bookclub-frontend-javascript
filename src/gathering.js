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
        let host = document.createElement('div')
        let date = document.createElement('div')
        let address = document.createElement('div')
        let time = document.createElement('div')

        let nextGathering = this.gatherings[this.gatherings.length-1]
        
    }
}