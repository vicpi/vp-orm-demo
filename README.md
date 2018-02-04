<<<<<<< HEAD
# vp-orm

Object Relational Mapping for JavaScript and Node.js.

## Installation

#### via NPM

npm install --save vp-orm

#### via yarn

yarn add vp-orm

## Usage

Suppose your database structure looks like the following:
<database structure image>

As you see, there are 2 tables, one representing the Author entity and
another representing the book entity.
Here is SQL needed to create the initial database structure as shown
on the image and fill it in with some data.
<sql for initial database creation>

Create a Model for your entity in a database
Let's create models in our JavaScript code that represent database entities.
First we create file author.js.
```js
import {Model} from 'vp-orm'

class Author extends Model {
    static table = 'author'
    static id = 'id'
    static firstName = 'first_name'
    static lastName = 'last_name'
    static birthYear = 'birth_date'
}
```

Next we are going to create file book.js.
import {Model} from 'vp-orm'

class Book extends Model {
    static table = 'book'
    static id = 'id'
    static title = 'title'
    static year = 'year'
    static authorId = 'author_id'
}


Show, that model fields and database fields are different
As you can see, you can name your model fields in a different manner
than the database fields are named. In this example model fields
are named according to camelCase, and database fields are named
using underscore.
Here you establish a connection between fields in your models
and fields in the database.

Select your models with where, order by two columns and limit
Let's imagine that we have an author id, and we need to get the data
about this author from the database.
Here is what we need to do. First, we need to realize, which model corresponds
to the author entity. It is Author model. Then, we need to create a Repository
for the Author model and invoke find method with necessary criteria.
Here is how it looks from the JavaScript point of view:
const AuthorRepository = ORM.createRepository(Author)
const searchCriteria = new Criteria()
    .where(
        expr(Author.id, '=', quote(authorId))
    )
Select your author model
Show that where criteria can be complicated
Create full name method in author model
Select your m to m models, like all the books of specified author
Add new book
Delete some book
Update the name of the author

// a lot of examples

## License

MIT
||||||| parent of 7908d2b... Add README and LICENSE
=======
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
>>>>>>> 7908d2b... Add README and LICENSE
