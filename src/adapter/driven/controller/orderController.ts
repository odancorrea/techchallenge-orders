import { Request, Response } from 'express'
import OrderUseCases from '../../../core/application/useCases/orderUseCases'
import OrderRepository from '../../driver/infra/repositories/orderRepository'
import queue from '../../driver/queue/queue'

class OrderController {
    async order(queueObject: any) {
        const parsedQueueObject = JSON.parse(queueObject.content.toString())
        const orderRepository = new OrderRepository()
        const orderUseCase = new OrderUseCases(orderRepository, queue)
        const order = await orderUseCase.create(parsedQueueObject)
        console.log(order)
        if (order) await orderUseCase.confirm(order)
    }

    async getStatus(req: Request, res: Response) {
        const orderRepository = new OrderRepository()
        const orderUseCase = new OrderUseCases(orderRepository, queue)
        const status = await orderUseCase.getStatus(parseInt(req.params.id))
        res.status(200).send(status)
    }

    async produce(req: Request, res: Response) {
        const orderRepository = new OrderRepository()
        const orderUseCase = new OrderUseCases(orderRepository, queue)
        const status = await orderUseCase.produce(parseInt(req.params.id))
        res.status(200).send(status)
    }

    async getOrders(req: Request, res: Response) {
        const orderRepository = new OrderRepository()
        const orderUseCase = new OrderUseCases(orderRepository, queue)
        const orders = await orderUseCase.getOrders()
        res.status(200).send(orders)
    }
}

export default new OrderController()