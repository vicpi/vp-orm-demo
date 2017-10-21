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
            const sqlQuery = `insert into ${model.constructor.table} set ?`
            console.log('---------------------- INSERT ------------------')
            console.log(sqlQuery)
            console.log('------------------------------------------------')
            this.connection.query(
                sqlQuery,
                model.toObject(),
                (error, results, fields) => {
                    if (error) {
                        throw error;
                    }
                    resolve(results)
                }
            );
        })
    }

    update = (model: Model, criteria: TCriteria) => {
        return new Promise((resolve, reject) => {
            const sqlQuery = `update ${model.constructor.table} set ? ${criteria}`
            console.log('---------------------- UPDATE ------------------')
            console.log(sqlQuery)
            console.log('------------------------------------------------')
            this.connection.query(
                sqlQuery,
                model.toObject(),
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                    }
                    resolve(results)
                }
            )
        });
    }

    delete = (model: Model, criteria: TCriteria) => {
        return new Promise((resolve, reject) => {
            const sqlQuery = `delete from ${model.constructor.table} ${criteria}`
            console.log('---------------------- DELETE -------------------')
            console.log(sqlQuery)
            console.log('-------------------------------------------------')
            this.connection.query(sqlQuery, function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                resolve(results)
            })
        });
    }
}

export {DataMapper}
