import mysql from 'mysql'
import config from './config.js'
import {Order, VpOrm} from 'vp-orm'
import AuthorModel from './models/author-model'
import {Criteria, quote, expr} from 'vp-orm'
import BookModel from './models/book-model'

VpOrm.configure({host: config.DATABASE_HOST, user: config.DATABASE_USER, password: config.DATABASE_PASSWORD, database: config.DATABASE_NAME})

async function getAllAuthors() {
    // select * from author
    const connection = VpOrm.getConnection()
    const authorRepository = VpOrm.createRepository(AuthorModel)
    const authors = await authorRepository.findAll()
    authors.forEach(async (author) => {
        // const books = await author.getBookList()
        // console.log(await author.getBookList());
        const book = new BookModel({title: 'The Fifth Mountain', year: '1996-01-01', author_id: 2})
        // const status = await author.addBook(book)
        // console.log(status);
    })
    const firstAuthor = authors[0]
    const booksOfAuthor = await firstAuthor.getBookList()
    const firstBookOfAuthor = booksOfAuthor[0]
    console.log('first ', firstBookOfAuthor)
    firstAuthor.removeBook(firstBookOfAuthor)
}

getAllAuthors()

async function get2AuthorsOrderedByBirthDate() {
    // select * from author  ORDER BY last_name DESC LIMIT 2
    const authorRepository = VpOrm.createRepository(AuthorModel)
    const criteria = new Criteria().limit(2).order(AuthorModel.birthDate, Order.desc)
    const authors = await authorRepository.find(criteria)
    console.log(authors)
}

// get2AuthorsOrderedByBirthDate()

async function getAuthorsAfter1900() {
    // select * from author WHERE (birth_date > "1900")
    const authorRepository = VpOrm.createRepository(AuthorModel)
    const criteria = new Criteria().where(expr(AuthorModel.birthDate, '>', quote(1900)))
    const authors = await authorRepository.find(criteria)
    console.log(authors)
}

// getAuthorsAfter1900()

async function getAllBooksByAuthor(authorId) {
    // select * from book WHERE (author_id = 3) ORDER BY title ASC, year ASC LIMIT 4 OFFSET 3
    const bookRepository = VpOrm.createRepository(BookModel)
    const bookCriteria = new Criteria().where(expr(BookModel.authorId, '=', authorId)).order(BookModel.title).order(BookModel.year).limit(4).offset(3)
    const booksByAuthor = await bookRepository.find(bookCriteria)
    console.log(booksByAuthor)
}

// getAllBooksByAuthor(3)
