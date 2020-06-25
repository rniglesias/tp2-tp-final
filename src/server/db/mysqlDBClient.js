import CustomError from '../errores/CustomError.js'
import DbClient from './DbClient.js'
import knexLib from 'knex'



class MysqlDBClient extends DbClient {
    constructor() {
        super()
        this.connected = false
        this.client = knexLib({
            client: 'mysql',
            connection: {
                host:'127.0.0.1',
                user:'root',
                password: '',
                database: 'instituto'
            }
        })
    }

    async connect() {
        try {
            this.client.raw('select 1+1 as result').then(function () {
                // there is a valid connection in the pool
              });
            this.connected = true;
        } catch (error) {
            throw new CustomError(500, 'error al conectarse a mysql', error)
        }
    }

    async disconnect() {

            this.connected = false
    }

    async _getClient() {
        if (!this.connected) {
            await this.connect()
            this.connected = true
        }
        return this.client
    }

    async getDb() {
        let db
        try {
            db = await this._getClient()
        } catch (error) {
            throw new CustomError(500, 'error al conectarse a mysql', error)
        }
        if (!db) {
            throw new CustomError(500, 'error al obtener la base de datos', true)
        }
        return db
    }
}

export default MysqlDBClient