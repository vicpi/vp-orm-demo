import express from 'express';
const router = express.Router();
import AuthorModel from '../models/author-model';
import {
    VpOrm,
    Criteria,
    quote,
    expr
} from 'vp-orm';

router.get('/', async (req, res) => {
    const authorRepository = VpOrm.createRepository(AuthorModel);
    const authors = await authorRepository.findAll();
    res.status(200).json(authors);
});

router.post('/', async (req, res) => {
    const requestData = JSON.parse(req.rawBody);
    const dataMapper = VpOrm.createDataMapper();
    const author = new AuthorModel({
        first_name: requestData.first_name,
        last_name: requestData.last_name,
        birth_date: requestData.birth_date
    });
    const status = await dataMapper.insert(AuthorModel, author);
    res.status(201).json(author);
});

router.delete('/:id/', async (req, res) => {
    const authorId = req.params.id;
    const dataMapper = VpOrm.createDataMapper();
    const deleteCriteria = new Criteria()
        .where(
            expr(AuthorModel.id, '=', quote(authorId))
        );
    const status = await dataMapper.delete(AuthorModel, deleteCriteria);

    res.status(200).json({
        status: STATUS_SUCCESS
    });
});

router.put('/:id/', async (req, res) => {
    const authorId = req.params.id;
    const requestData = JSON.parse(req.rawBody);
    const dataMapper = VpOrm.createDataMapper();
    const author = new AuthorModel({
        id: authorId,
        first_name: requestData.first_name,
        last_name: requestData.last_name,
        birth_date: requestData.birth_date
    });
    const updateCriteria = new Criteria()
        .where(
            expr(
                AuthorModel.id, '=', authorId
            )
        );
    const status = await dataMapper.update(AuthorModel, author, updateCriteria);
    res.status(200).json(author);
});

router.get('/:authorId/', async (req, res) => {
    const authorId = req.params.authorId;
    const authorRepository = VpOrm.createRepository(AuthorModel);
    const criteria = new Criteria().where(
        expr(AuthorModel.id, '=', quote(authorId))
    );
    const authors = await authorRepository.find(criteria);
    const author = authors[0];
    res.status(200).json(author);
});

router.get('/:authorId/books/', async (req, res) => {
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

module.exports = router;
