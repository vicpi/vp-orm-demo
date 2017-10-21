// @flow

import {Expression} from './expression'
import {Limit} from './limit'
import {Order, TOrder} from './order'

class Criteria {
    wherePart: Expression|null = null
    orderPart = []
    limitPart: Limit|null = null

    where(expression: Expression) {
        this.wherePart = expression
        return this
    }

    limit(limit: number, offset: number) {
        this.limitPart = new Limit(limit, offset)
        return this
    }

    order(column: string, sorting: string) {
        this.orderPart.push(new Order(column, sorting))
        return this
    }

    _getOrderPart() {
        return this.orderPart.length === 0
            ? ''
            : `ORDER BY ` + this.orderPart.join(', ')
    }

    _getWherePart() {
        return this.wherePart !== null
            ? 'WHERE ' + String(this.wherePart)
            : ''
    }

    _getLimitPart() {
        return this.limitPart === null
            ? ''
            : 'LIMIT ' + String(this.limitPart)
    }

    toString() {
        let where = this._getWherePart()
        let order = this._getOrderPart()
        let limit = this._getLimitPart()
        return `${where} ${order} ${limit}`
    }
}

export {Criteria}
