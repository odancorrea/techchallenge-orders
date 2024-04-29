import { Order } from "../entities/order";

export default interface IOrderRepository {
    find(): Promise<Order[] | []>,
    findById(id: number): Promise<Order | undefined>,
    update(order: any): Promise<boolean>,
    create(order: any): Promise<Order | undefined>
}