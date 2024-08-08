import iOrderUseCases from "./iOrderUseCases";
import { Order } from "../../domain/entities/order";
import IOrderRepository from "../../domain/repositories/iOrderRepository";
import IOrderQueue from "../../domain/repositories/iOrderQueue";

class OrderUseCases implements iOrderUseCases {
    constructor (private orderRepository: IOrderRepository, private orderQueue: IOrderQueue) {}
    
    async create(orderObject: any): Promise<Order | undefined> {
        return this.orderRepository.create(orderObject)
    }

    async getStatus(id: any): Promise<string | undefined> {
        let order = await this.orderRepository.findById(id)
        if (order) {
            return order.status
        }
    }

    async produce(id: any): Promise<void> {
        let order = await this.orderRepository.findById(id)
        if (order) await this.orderRepository.update(Object.assign(order, { status: 'pronto' }))
    }

    async confirm(order: any): Promise<void> {
        try {
            await this.orderRepository.update(Object.assign(order, { status: 'confirmado' }))
            order.status = 2
            this.orderQueue.sendToQueue(JSON.stringify(order), process.env.CONFIRMED_ORDER || 'pedido_confirmado')
        } catch (error) {
            order.status = 4
            await this.orderRepository.update(Object.assign(order, { status: 'erro' }))
            this.orderQueue.sendToQueue(JSON.stringify(order), process.env.ERROR_ORDER || 'pedido_erro')
        }
        
    }

    async getOrders(): Promise<any> {
        return await this.orderRepository.find()
    }
}

export default OrderUseCases