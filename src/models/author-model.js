import {Model} from 'vp-orm'
import BookModel from './book-model'

class AuthorModel extends Model {
    static table = 'author'

    static id = 'id'
    static firstName = 'first_name'
    static lastName = 'last_name'
    static birthDate = 'birth_date'

    static books = {
        type: 'foreign_key',
        foreignModel: BookModel,
        foreignKey: BookModel.authorId,
        foreignModelKey: 'authorId'
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

export default AuthorModel
