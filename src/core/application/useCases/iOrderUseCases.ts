import { Order } from "../../domain/entities/order";

export default interface iOrderUseCases {
    create(orderObject: any): Promise<Order | undefined>,
    getStatus(id: number): Promise<string | undefined>
}