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

async function insertBook() {
    const dataMapper = ORM.createDataMapper()
    const book = new Book({
        title: 'The Fifth Mountain',
        year: '1996-01-01',
        author_id: 3
    })
    // console.log(book.toObject())
    const status = await dataMapper.insert(book)
    // console.log(status)
}

// insertBook()
