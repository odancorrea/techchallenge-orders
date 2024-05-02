import { Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn } from "typeorm"

@Entity()
export class Order {
    static ORDER_STATUS_RECEIVED: string = 'recebido'
    static ORDER_STATUS_PREPARING: string = 'preparando'
    static ORDER_STATUS_DONE: string = 'promto'
    @ObjectIdColumn()
    id?: number

    @Column()
    idOrder: number

    @Column()
    date: Date

    @Column()
    status: string

    @Column()
    client: number

    @Column()
    products: any[]

    constructor (idOrder: number, date: Date, status: string, client: number, products: number[]) {
        this.idOrder = idOrder
        this.date = date
        this.status = status
        this.client = client
        this.products = products
    }
}