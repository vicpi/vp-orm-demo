import express from 'express';
const router = express.Router();
import BookModel from '../models/book-model';
import {
    VpOrm,
    Criteria,
    quote,
    expr
} from 'vp-orm'

router.get('/', async (req, res) => {
    const bookRepository = VpOrm.createRepository(BookModel);
    const books = await bookRepository.findAll();
    res.status(200).json(books);
});

router.get('/:bookId/', async (req, res) => {
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

router.delete('/:id/', async (req, res) => {
    const bookId = req.params.id;
    const dataMapper = VpOrm.createDataMapper();
    const deleteCriteria = new Criteria()
        .where(
            expr(BookModel.id, '=', quote(bookId))
        );
    const status = await dataMapper.delete(BookModel, deleteCriteria);

    res.status(200).json({
        status: STATUS_SUCCESS
    });
});

router.put('/:id/', async (req, res) => {
    const bookId = req.params.id;
    const requestData = JSON.parse(req.rawBody);
    const dataMapper = VpOrm.createDataMapper();
    const book = new BookModel({
        id: bookId,
        title: requestData.title,
        year: requestData.year,
        author_id: requestData.author_id
    });
    const updateCriteria = new Criteria()
        .where(
            expr(
                BookModel.id, '=', bookId
            )
        );
    try {
        const status = await dataMapper.update(BookModel, book, updateCriteria)
    } catch (e) {
        console.error('Error:', e);
    }
    res.status(200).json(book);
});

router.post('/', async (req, res) => {
    const requestData = JSON.parse(req.rawBody);
    const book = new BookModel({
        title: requestData.title,
        year: requestData.year,
        author_id: requestData.author_id
    });
    const dataMapper = VpOrm.createDataMapper();
    const status = await dataMapper.insert(BookModel, book);
    res.status(201).json(book);
});

module.exports = router;
