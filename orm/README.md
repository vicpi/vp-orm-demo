# vp-orm

Object Relational Mapping for JavaScript and Node.js.

## Installation

#### via npm

```bash
npm install --save vp-orm
```

#### via yarn

```bash
yarn add vp-orm
```

## Usage

#### Database structure

Suppose the database structure looks like the following.
We have 2 tables, `author` and `book`.

Here is `author` table:
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

Here is `book` table:
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

As you see, there are 2 tables, one representing the Author entity and
another representing the book entity.

Here is SQL needed to create the initial database structure as shown
on the image and fill it in with some data.
```sql
create database author_books default character set 'utf8';

use author_books;

create table author (
    id int(11) not null primary key auto_increment,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    birth_date datetime not null
);

create table book (
    id int(11) not null primary key auto_increment,
    title varchar(255) not null,
    year datetime not null,
    author_id int(11) not null
);

insert into author (first_name, last_name, birth_date)
    values ('Joanne', 'Rowling', '1965-07-31');

insert into author (first_name, last_name, birth_date)
    values ('Hans Christian', 'Andersen', '1805-04-02');

insert into author (first_name, last_name, birth_date)
    values ('Paulo', 'Coelho', '1947-08-24');

insert into book (title, year, author_id)
    values ('Harry Potter and the Philosopher\'s Stone', '1997-07-26', 1);

insert into book (title, year, author_id)
    values ('The Princess and the Pea', '1835-01-01', 2);

insert into book (title, year, author_id)
    values ('The Alchemist', '1988-01-01', 3);

insert into book (title, year, author_id)
    values ('Eleven Minutes', '2003-01-01', 3);

insert into book (title, year, author_id)
    values ('The Pilgrimage', '1987-01-01', 3);

insert into book (title, year, author_id)
    values ('The Zahir', '2005-01-01', 3);

```

This is how our tables will look like after filling them with this sample data.
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

#### Creating models representing database tables

We are going to create models that would represent database entities.
Since we have 2 tables in a database, we will create 2 models in our JavaScript codebase.
By means of this classes we will be able to interact with our database.
A model is simply a JavaScript class that extends a Model class.

First we will create AuthorModel. We can put it into a `models` directory under the name `author-model.js`.
Here is how it looks.

```js
import {Model} from 'vp-orm'

class AuthorModel extends Model {
    static table = 'author'

    static id = 'id'
    static firstName = 'first_name'
    static lastName = 'last_name'
    static birthDate = 'birth_date'
}

export default AuthorModel
```

Next, we are going to create BookModel.
Similarly, we will put it into `models/book-model.js`.

```js
import {Model} from 'vp-orm'

class BookModel extends Model {
    static table = 'book'

    static id = 'id'
    static title = 'title'
    static year = 'year'
    static authorId = 'author_id'
}

export default BookModel
```

Here we are establishing a connection between fields in your models
and fields in the database.
By the way, as you can see, we can name our model fields in a different manner
than the database fields. In this way, we can use camelCase for our
JavaScript codebase while using snake_case when it comes to naming columns in a database.

Now, when we have created our models, we can actually perform some queries
against a database.

#### Performing SELECT statements

Now we want to get only 2 latest authors ordered by their birth date descending.
For this we would need to use `find` method with specific criteria.

```js
import {ORM, Criteria, Order} from 'vp-orm'
import AuthorModel from './models/author-model'

const authorRepository = ORM.createRepository(AuthorModel)
const criteria = new Criteria()
    .limit(2)
    .order(AuthorModel.birthDate, Order.desc)
const authors = await authorRepository.find(criteria)
```

This will result in the following SQL query:
```sql
select * from author ORDER BY birth_date DESC LIMIT 2
```

Let's get a list of authors who were born after 1900.
```js
import {ORM, Criteria, Order, expr} from 'vp-orm'
import AuthorModel from './models/author-model'

const authorRepository = ORM.createRepository(AuthorModel)
const criteria = new Criteria()
    .where(
        expr(AuthorModel.birthDate, '>', quote(1900))
    )
const authors = await authorRepository.find(criteria)
```

This will result in the following SQL query:
```sql
select * from author WHERE (birth_date > "1900")
```

Now let's get 2 books by a specific author, sorted by title and year,
with an offset of 1.
```js
import {ORM, Criteria, expr} from 'vp-orm'
import BookModel from './models/book-model'

const bookRepository = ORM.createRepository(BookModel)
const bookCriteria = new Criteria()
    .where(
        expr(BookModel.authorId, '=', authorId)
    )
    .order(BookModel.title)
    .order(BookModel.year)
    .limit(2)
    .offset(1)
const booksByAuthor = await bookRepository.find(bookCriteria)
```

This will result in the following SQL query:
```sql
select * from book WHERE (author_id = 3) ORDER BY title ASC, year ASC LIMIT 4 OFFSET 3
```

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

#### Creating custom methods on the model

We can create custom methods on the model classes.
To show an example, let's create `getFullName` method in author model.
```js
import {Model} from '../../orm'

class AuthorModel extends Model {
    static table = 'author'

    static id = 'id'
    static firstName = 'first_name'
    static lastName = 'last_name'
    static birthDate = 'birth_date'

    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

export default AuthorModel
```

Now, let's get a list of all authors and output their full names to the console.
```js
import {ORM} from 'vp-orm'

const authorRepository = ORM.createRepository(AuthorModel)
const authors = await authorRepository.findAll()
authors.forEach(author => console.log(author.getFullName()))
```

This will be the output in the console:
```
Joanne Rowling
Hans Christian Andersen
Paulo Coelho
```

#### Inserting new models to the database

Let's create a new book now and add it to the list of of existing books.

```js
import {ORM} from 'vp-orm'
import BookModel from './models/book-model'

const dataMapper = ORM.createDataMapper()
const book = new BookModel({
    title: 'The Fifth Mountain',
    year: '1996-01-01',
    author_id: 3
})
const status = await dataMapper.insert(BookModel, book)
```

This will result in a following SQL query:
```sql
insert into book set title = 'Manual of the Warrior of Light', year = '1998-01-01', author_id = 3
```

#### Updating data in the database

Now we suddenly recalled that the book that we have added, 'Manual of the Warrior of Light',
was published in 1997, and not in 1998. So, we need to update this record in our database.

```js
import {ORM, Criteria, expr} from 'vp-orm'
import BookModel from './models/book-model'

const dataMapper = ORM.createDataMapper()
let books = await ORM.createRepository(BookModel)
    .find(new Criteria().where(
        expr(BookModel.authorId, '=', 3)
    ))
const book = books[0]
book.year = '1997-01-01'
const updateCriteria = new Criteria()
    .where(
        expr(
            BookModel.id, '=', 4
        )
    )
const status = await dataMapper.update(BookModel, book, updateCriteria)
```

#### Deleting data from the database

Let's assume that we have added too many books in the database with the same title.
But we want to have only 1 book with that title in our database, not 3 of them.
Other two need to be deleted.

```js
import {ORM, Order, Criteria, expr, quote} from 'vp-orm'

const dataMapper = ORM.createDataMapper()
const deleteCriteria = new Criteria()
    .where(
        expr(BookModel.title, '=', quote('The Fifth Mountain'))
    )
    .order(BookModel.id, Order.desc)
    .limit(2)
const status = await dataMapper.delete(BookModel, deleteCriteria)
```
Here is how the SQL query would look like:
```sql
delete from book WHERE (title = "The Fifth Mountain") ORDER BY id DESC LIMIT 2
```

## Supported databases

* MySQL
* MariaDB

## License

MIT
