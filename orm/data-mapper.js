import Model from './model'
import type { TConnection } from './orm'
import type { TCriteria } from './criteria'

class DataMapper {
    connection: TConnection

    constructor(connection: TConnection) {
        this.connection = connection
    }

    insert = (model: Model) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`insert into ${model.constructor.table} set ?`, model, (error, results, fields) => {
                if (error) {
                    throw error;
                }
                resolve(true);
            });
        })
    }

    update = (model: Model, criteria: TCriteria) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`update ${model.constructor.table} set ? ${criteria}`, model, function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                resolve(model)
            })
        });
    }

    delete = (model: Model, criteria: TCriteria) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`delete from ${model.constructor.table} ${criteria}`, function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                resolve(model)
            })
        });
    }
}

export {DataMapper}
