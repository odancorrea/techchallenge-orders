import { Order } from "../../../core/domain/entities/order"
import iDrivenAdapter from "../../driven/iDrivenAdapter"
import { DataSource } from "typeorm"

class MongoDataSource implements iDrivenAdapter {    
    appDataSource: any
    
    constructor() {
        this.appDataSource = new DataSource({
            type: "mongodb",
            host: process.env.DATABASE_URI || "localhost",
            port: 27017,
            database: "orders",
            synchronize: true,
            logging: true,
            entities: [Order],
            subscribers: [],
            migrations: [],
        })
    }

    async init() {
        await this.appDataSource.initialize()
        console.log('Db Connected')
    }

    getDataSource() {
        return this.appDataSource
    }
}

export default new MongoDataSource()
