import iOrderUseCases from "./iOrderUseCases";
import { Order } from "../../domain/entities/order";
import IOrderRepository from "../../domain/repositories/iOrderRepository";

class OrderUseCases implements iOrderUseCases {
    constructor (private orderRepository: IOrderRepository) {}
    
    async create(orderObject: any): Promise<Order | undefined> {
        return this.orderRepository.create(orderObject)
    }

    async getStatus(id: number): Promise<string | undefined> {
        let order = await this.orderRepository.findById(id)
        if (order) {
            return order.status
        }
    }

    async produce(order: Order): Promise<void> {
        // order produced
        await this.orderRepository.update(Object.assign(order, { status: 'pronto' }))
    }
}

export default OrderUseCases