// @flow
import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import config from './config.js';
import { VpOrm } from 'vp-orm'
import authorRoutes from './routes/author-routes.js';
import bookRoutes from './routes/book-routes.js';

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

app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is wrong.')
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000')
});
