import mysql from 'mysql'
import config from './config.js'
import {VpOrm} from 'vp-orm'
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

async function updateBook() {
    // update book set ? WHERE (id = 4)
    const dataMapper = VpOrm.createDataMapper()
    let books = await VpOrm.createRepository(BookModel)
        .find(new Criteria().where(
            expr(BookModel.authorId, '=', 3)
        ))
    const book = books[0]
    book.year = '1996-01-01'
    const updateCriteria = new Criteria()
        .where(
            expr(
                BookModel.id, '=', 4
            )
        )
    const status = await dataMapper.update(BookModel, book, updateCriteria)
    console.log(status)
}

updateBook()
