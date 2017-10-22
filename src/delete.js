import mysql from 'mysql'
import config from './config.js'
import {VpOrm, Order} from 'vp-orm'
import BookModel from './models/book-model'
import {
    Criteria,
    quote,
    expr
} from 'vp-orm'

VpOrm.configure({
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME
})

async function deleteBook() {
    const dataMapper = VpOrm.createDataMapper()
    const deleteCriteria = new Criteria()
        .where(
            expr(BookModel.title, '=', quote('The Fifth Mountain'))
        )
        .order(BookModel.id, Order.desc)
        .limit(2)
    const status = await dataMapper.delete(BookModel, deleteCriteria)
    // console.log(status)
}

deleteBook()
