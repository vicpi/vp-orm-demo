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
