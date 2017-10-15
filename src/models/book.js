import {Model} from 'vp-orm'

class Book extends Model {
    static table = 'book'
    static id = 'id'
    static title = 'title'
    static year = 'year'
    static authorId = 'author_id'
}