import mysql from 'mysql'
import config from './config.js'
import {ORM} from '../orm'
import Author from './models/author-model'
import {
    Criteria,
    quote,
    expr
} from '../orm'

ORM.configure({
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME
})

const getAllAuthors = async () => {
    const connection = ORM.getConnection()

    const authorRepository = ORM.createRepository(Author)
    const authors = await authorRepository.findAll()
    console.log(authors)
}

// getAllAuthors()

const get2AuthorsOrderedByLastName = async () => {
    const authorRepository = ORM.createRepository(Author)
    const criteria = new Criteria()
        .limit(2)
        .order({column: Author.lastName, sorting: 'DESC'})
    const authors = await authorRepository.find(criteria)
    console.log(authors)
}

// get2AuthorsOrderedByLastName()

async function getAuthorsAfter1900() {
    const authorRepository = ORM.createRepository(Author)
    const criteria = new Criteria()
        .where(expr(Author.birthDate, '>', quote(1900)))
    const authors = await authorRepository.find(criteria)
    console.log(authors)
}

getAuthorsAfter1900()
