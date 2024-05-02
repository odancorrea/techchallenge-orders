import { Order } from "../../domain/entities/order";

export default interface iOrderUseCases {
    create(orderObject: any): Promise<Order | undefined>,
    getStatus(id: any): Promise<string | undefined>,
    getOrders(): Promise<any>
}