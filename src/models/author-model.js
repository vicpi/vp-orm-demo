import {Model} from '../../orm'

class Author extends Model {
    static table = 'author'
    static id = 'id'
    static firstName = 'first_name'
    static lastName = 'last_name'
    static birthDate = 'birth_date'
}

export default Author
