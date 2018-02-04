// @flow
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require('./config.js');
import {
    VpOrm,
    Criteria,
    quote,
    expr
} from 'vp-orm'
import AuthorModel from './models/author-model';
import BookModel from './models/book-model'

const app = express();

const STATUS_SUCCESS = 'success';

app.use(function (req, res, next) {
    req.rawBody = '';
    req.setEncoding('utf8');

    req.on('data', function (chunk) {
        req.rawBody += chunk;
    });

    req.on('end', function () {
        next();
    });
});
app.use(bodyParser.raw());
app.use(cors());


VpOrm.configure({
    host: config.DATABASE_HOST,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE_NAME
})

const connection = VpOrm.getConnection()

app.get('/authors/', async (req, res) => {
    const authorRepository = VpOrm.createRepository(AuthorModel);
    const authors = await authorRepository.findAll();
    res.status(200).json(authors);
});

app.post('/authors/', async (req, res) => {
    const requestData = JSON.parse(req.rawBody);
    const dataMapper = VpOrm.createDataMapper()
    const author = new AuthorModel({
        first_name: requestData.first_name,
        last_name: requestData.last_name,
        birth_date: requestData.birth_date
    })
    const status = await dataMapper.insert(AuthorModel, author)
    res.status(201).json(author);
});

app.delete('/authors/:id/', async (req, res) => {
    const authorId = req.params.id;
    const dataMapper = VpOrm.createDataMapper();
    const deleteCriteria = new Criteria()
        .where(
            expr(AuthorModel.id, '=', quote(authorId))
        );
    const status = await dataMapper.delete(AuthorModel, deleteCriteria)

    res.status(200).json({
        status: STATUS_SUCCESS
    });
});

app.put('/authors/:id/', async (req, res) => {
    const authorId = req.params.id;
    const requestData = JSON.parse(req.rawBody);
    const dataMapper = VpOrm.createDataMapper()
    const author = new AuthorModel({
        id: authorId,
        first_name: requestData.first_name,
        last_name: requestData.last_name,
        birth_date: requestData.birth_date
    })
    const updateCriteria = new Criteria()
        .where(
            expr(
                AuthorModel.id, '=', authorId
            )
        )
    const status = await dataMapper.update(AuthorModel, author, updateCriteria)
    res.status(200).json(author);
});

app.get('/authors/:authorId/', async (req, res) => {
    const authorId = req.params.authorId;
    const authorRepository = VpOrm.createRepository(AuthorModel);
    const criteria = new Criteria().where(
        expr(AuthorModel.id, '=', quote(authorId))
    );
    const authors = await authorRepository.find(criteria);
    const author = authors[0];
    res.status(200).json(author);
});

app.get('/authors/:authorId/books/', async (req, res) => {
    const authorId = req.params.authorId;
    const authorRepository = VpOrm.createRepository(AuthorModel);
    const criteria = new Criteria().where(
        expr(AuthorModel.id, '=', quote(authorId))
    );
    const authors = await authorRepository.find(criteria);
    const author = authors[0];
    const books = await author.getBookList();
    res.json(books);
});

app.get('/books/', async (req, res) => {
    const bookRepository = VpOrm.createRepository(BookModel);
    const books = await bookRepository.findAll();
    res.status(200).json(books);
});

app.get('/books/:bookId/', async (req, res) => {
    const bookId = req.params.bookId;
    const bookRepository = VpOrm.createRepository(BookModel);
    const criteria = new Criteria().where(
        expr(BookModel.id, '=', quote(bookId))
    );
    const books = await bookRepository.find(criteria);
    const book = books[0];
    res.status(200).json({
        book: book
    });
});

app.delete('/books/:id/', async (req, res) => {
    const bookId = req.params.id;
    const dataMapper = VpOrm.createDataMapper();
    const deleteCriteria = new Criteria()
        .where(
            expr(BookModel.id, '=', quote(bookId))
        );
    const status = await dataMapper.delete(BookModel, deleteCriteria)

    res.status(200).json({
        status: STATUS_SUCCESS
    });
});

app.put('/books/:id/', async (req, res) => {
    const bookId = req.params.id;
    const requestData = JSON.parse(req.rawBody);
    const dataMapper = VpOrm.createDataMapper()
    const book = new BookModel({
        id: bookId,
        title: requestData.title,
        year: requestData.year,
        author_id: requestData.author_id
    })
    const updateCriteria = new Criteria()
        .where(
            expr(
                BookModel.id, '=', bookId
            )
        )
    try {
        const status = await dataMapper.update(BookModel, book, updateCriteria)
    } catch (e) {
        console.error('Error:', e)
    }
    res.status(200).json(book);
});

app.post('/books/', async (req, res) => {
    const requestData = JSON.parse(req.rawBody);
    const book = new BookModel({
        title: requestData.title,
        year: requestData.year,
        author_id: requestData.author_id
    })
    const dataMapper = VpOrm.createDataMapper()
    const status = await dataMapper.insert(BookModel, book)
    res.status(201).json(book);
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is wrong.')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000')
});
