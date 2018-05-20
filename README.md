# vp-orm demo

Simple application demonstrating how to use vp-orm, a simple ORM for JavaScript and Node.js.
It shows how to use ORM to perform some typical interactions with the database.

## Prerequisites

You need to have MySQL (https://www.mysql.com/) installed.

## Installation and running locally

1. Clone the project from Github.
1. Go to the project root.
1. Run `npm install`.
1. Run `mysql -uroot < database-structure.sql`. This will create a database called author_books in MySQL and fill it with sample data.
1. Run `npm start`.

## Database structure

The SQL script above will create the following database structure.

An `author` table:
```
+------------+--------------+------+-----+---------+----------------+
| Field      | Type         | Null | Key | Default | Extra          |
+------------+--------------+------+-----+---------+----------------+
| id         | int(11)      | NO   | PRI | NULL    | auto_increment |
| first_name | varchar(255) | NO   |     | NULL    |                |
| last_name  | varchar(255) | NO   |     | NULL    |                |
| birth_date | datetime     | NO   |     | NULL    |                |
+------------+--------------+------+-----+---------+----------------+
```



A `book` table:
```
+-----------+--------------+------+-----+---------+----------------+
| Field     | Type         | Null | Key | Default | Extra          |
+-----------+--------------+------+-----+---------+----------------+
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| title     | varchar(255) | NO   |     | NULL    |                |
| year      | datetime     | NO   |     | NULL    |                |
| author_id | int(11)      | NO   |     | NULL    |                |
+-----------+--------------+------+-----+---------+----------------+
```


These tables will be filled with sample data.
```
Author table
+----+----------------+-----------+---------------------+
| id | first_name     | last_name | birth_date          |
+----+----------------+-----------+---------------------+
|  1 | Joanne         | Rowling   | 1965-07-31 00:00:00 |
|  2 | Hans Christian | Andersen  | 1805-04-02 00:00:00 |
|  3 | Paulo          | Coelho    | 1947-08-24 00:00:00 |
+----+----------------+-----------+---------------------+

Book table
+----+------------------------------------------+---------------------+-----------+
| id | title                                    | year                | author_id |
+----+------------------------------------------+---------------------+-----------+
| 12 | Harry Potter and the Philosopher's Stone | 1997-07-26 00:00:00 |         1 |
| 13 | The Princess and the Pea                 | 1835-01-01 00:00:00 |         2 |
| 14 | The Alchemist                            | 1988-01-01 00:00:00 |         3 |
| 15 | Eleven Minutes                           | 2003-01-01 00:00:00 |         3 |
| 16 | The Pilgrimage                           | 1987-01-01 00:00:00 |         3 |
| 17 | The Zahir                                | 2005-01-01 00:00:00 |         3 |
| 18 | The Fifth Mountain                       | 1996-01-01 00:00:00 |         3 |
+----+------------------------------------------+---------------------+-----------+
```

## Performing HTTP requests

Application provides REST API to perform some actions on the database.
You can use Postman (https://www.getpostman.com/) to make HTTP requests or
any other tool of your choice.

### List of authors

Request
```
GET http://localhost:3000/authors/
```

Response
```
[
  {
    "id": 1,
    "firstName": "Joanne",
    "lastName": "Rowling",
    "birthDate": "1965-07-30T22:00:00.000Z"
  },
  {
    "id": 2,
    "firstName": "Hans Christian",
    "lastName": "Andersen",
    "birthDate": "1805-04-01T22:00:00.000Z"
  },
  {
    "id": 3,
    "firstName": "Paulo",
    "lastName": "Coelho",
    "birthDate": "1947-08-23T22:00:00.000Z"
  },
  {
    "id": 7,
    "firstName": "Firstname",
    "lastName": "Surname",
    "birthDate": "2001-11-09T23:00:00.000Z"
  }
]
```

### Create a new author

Request
```
POST http://localhost:3000/authors/

Body:
{
      "first_name": "Firstname",
      "last_name": "Lastname",
      "birth_date": "2001-11-10"
}
```

Response
```
{
  "firstName": "Firstname",
  "lastName": "Lastname",
  "birthDate": "2001-11-10"
}
```

### Delete an author

Request
```
DELETE http://localhost:3000/authors/6/
```

Response
```
{
  "status": "success"
}
```

### Update an author

Request
```
PUT http://localhost:3000/authors/7/
Body:
{
      "first_name": "Firstname",
      "last_name": "Surname",
      "birth_date": "2001-11-10"
}
```

Response
```
{
  "id": "7",
  "firstName": "Firstname",
  "lastName": "Surname",
  "birthDate": "2001-11-10"
}
```

### Get author details

Request
```
GET http://localhost:3000/authors/7/
```

Response
```
{
  "id": 7,
  "firstName": "Firstname",
  "lastName": "Surname",
  "birthDate": "2001-11-09T23:00:00.000Z"
}
```

### Get author's books

Request
```
GET http://localhost:3000/authors/3/books/
```

Response
```
[
  {
    "id": 14,
    "title": "The Alchemist",
    "year": "1987-12-31T23:00:00.000Z",
    "authorId": 3
  },
  {
    "id": 15,
    "title": "Eleven Minutes",
    "year": "2002-12-31T23:00:00.000Z",
    "authorId": 3
  },
  {
    "id": 16,
    "title": "The Pilgrimage",
    "year": "1986-12-31T23:00:00.000Z",
    "authorId": 3
  },
  {
    "id": 17,
    "title": "The Zahir",
    "year": "2004-12-31T23:00:00.000Z",
    "authorId": 3
  }
]
```

### Get the list of all books by all authors

Request
```
GET http://localhost:3000/books/
```

Response
```
[
  {
    "id": 13,
    "title": "The Princess and the Pea",
    "year": "1834-12-31T23:00:00.000Z",
    "authorId": 2
  },
  {
    "id": 14,
    "title": "The Alchemist",
    "year": "1987-12-31T23:00:00.000Z",
    "authorId": 3
  },
  {
    "id": 15,
    "title": "Eleven Minutes",
    "year": "2002-12-31T23:00:00.000Z",
    "authorId": 3
  },
  {
    "id": 16,
    "title": "The Pilgrimage",
    "year": "1986-12-31T23:00:00.000Z",
    "authorId": 3
  },
  {
    "id": 17,
    "title": "The Zahir",
    "year": "2004-12-31T23:00:00.000Z",
    "authorId": 3
  },
  {
    "id": 18,
    "title": "The Fifth Mountain",
    "year": "1995-12-31T23:00:00.000Z",
    "authorId": 2
  },
  {
    "id": 19,
    "title": "The Fifth Mountain",
    "year": "1995-12-31T23:00:00.000Z",
    "authorId": 2
  },
  {
    "id": 20,
    "title": "The Fifth Mountain",
    "year": "1995-12-31T23:00:00.000Z",
    "authorId": 2
  },
  {
    "id": 21,
    "title": "Fifth",
    "year": "2012-12-26T23:00:00.000Z",
    "authorId": 1
  },
  {
    "id": 22,
    "title": "The Fifth Mountain",
    "year": "1995-12-31T23:00:00.000Z",
    "authorId": 2
  },
  {
    "id": 24,
    "title": "The Fifth Mountain",
    "year": "1995-12-31T23:00:00.000Z",
    "authorId": 2
  },
  {
    "id": 25,
    "title": "The Fifth Mountain",
    "year": "1995-12-31T23:00:00.000Z",
    "authorId": 2
  }
]
```

### Create a book

Request
```
POST http://localhost:3000/books/
```

Response
```
{
  "title": "Useful Book",
  "year": "2006-01-01",
  "authorId": "3"
}
```

### Get book details

Request
```
GET http://localhost:3000/books/14/
```

Response
```
{
  "book": {
    "id": 14,
    "title": "The Alchemist",
    "year": "1987-12-31T23:00:00.000Z",
    "authorId": 3
  }
}
```

### Delete a book

Request
```
DELETE http://localhost:3000/books/15/
```

Response
```
{
  "status": "success"
}
```

### Update a book

Request
```
PUT http://localhost:3000/books/17/
Body:
{
      "title": "Interesting Book",
      "year": "2002-01-01",
      "author_id": "3"
}
```

Response
```
{
  "id": "17",
  "title": "Interesting Book",
  "year": "2002-01-01",
  "authorId": "3"
}
```

## License

MIT
