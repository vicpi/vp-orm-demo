import mysql from 'mysql'
import config from './config.js'
import {Order, ORM} from '../orm'
import AuthorModel from './models/author-model'
import {
    Criteria,
    quote,
    expr
} from '../orm'
import BookModel from './models/book-model'

ORM.configure({
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME
})

async function getAllAuthors() {
    // select * from author
    const connection = ORM.getConnection()
    const authorRepository = ORM.createRepository(AuthorModel)
    const authors = await authorRepository.findAll()
    console.log(authors)
}

getAllAuthors()

async function get2AuthorsOrderedByLastName() {
    // select * from author  ORDER BY last_name DESC LIMIT 2
    const authorRepository = ORM.createRepository(AuthorModel)
    const criteria = new Criteria()
        .limit(2)
        .order(AuthorModel.lastName, Order.desc)
    const authors = await authorRepository.find(criteria)
    console.log(authors)
}

get2AuthorsOrderedByLastName()

async function getAuthorsAfter1900() {
    // select * from author WHERE (birth_date > "1900")
    const authorRepository = ORM.createRepository(AuthorModel)
    const criteria = new Criteria()
        .where(
            expr(AuthorModel.birthDate, '>', quote(1900))
        )
    const authors = await authorRepository.find(criteria)
    console.log(authors)
}

// getAuthorsAfter1900()

async function getAllBooksByAuthor(authorId) {
    // select * from book WHERE (author_id = 3) ORDER BY title ASC, year ASC LIMIT 4 OFFSET 3
    const bookRepository = ORM.createRepository(BookModel)
    const bookCriteria = new Criteria()
        .where(
            expr(BookModel.authorId, '=', authorId)
        )
        .order(BookModel.title)
        .order(BookModel.year)
        .limit(4)
        .offset(3)
    const booksByAuthor = await bookRepository.find(bookCriteria)
    console.log(booksByAuthor)
}

// getAllBooksByAuthor(3)
