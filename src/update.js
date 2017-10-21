import mysql from 'mysql'
import config from './config.js'
import {ORM} from '../orm'
import Author from './models/author'
import {
    Criteria,
    quote,
    expr
} from '../orm'
import Book from './models/book'

ORM.configure({
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME
})

async function updateBook() {
    const dataMapper = ORM.createDataMapper()
    let books = await ORM.createRepository(Book)
        .find(new Criteria().where(
            expr(Book.authorId, '=', 3)
        ))
    const book = books[0]
    book.year = '1996-01-01'
    const updateCriteria = new Criteria()
        .where(expr(
            Book.id, '=', 4
        ))
    const status = await dataMapper.update(book, updateCriteria)
    // console.log(status)
}

updateBook()
