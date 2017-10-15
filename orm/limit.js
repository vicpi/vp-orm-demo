// @flow

class Limit {
    limit: number
    offset: number

    constructor(limit: number, offset: number) {
        this.limit = limit;
        if (offset !== undefined) {
            this.offset = offset;
        }
    }

    toString() {
        let string = String(this.limit)
        if (this.offset !== undefined) {
            string += ` OFFSET ${this.offset}`
        }
        return string
    }
}

export {
    Limit
}
